import { Injectable, ConflictException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordToken } from './entities/reset-password-token.entity';
import { createHash, randomBytes } from 'crypto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ResetPasswordToken)
    private readonly resetTokenRepository: Repository<ResetPasswordToken>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, name, password, confirmPassword } = registerDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    const { password: _, ...userData } = user;
    return {
      message: 'Usuario registrado exitosamente',
      user: userData,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN') || '1h',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN') || '7d',
    });
    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return { message: 'Si el correo está registrado, recibirás instrucciones' };
    }
    await this.resetTokenRepository.delete({ user, used: false });
    const token = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15);
    const resetToken = this.resetTokenRepository.create({
      user,
      token: tokenHash,
      expiresAt,
      used: false,
    });
    await this.resetTokenRepository.save(resetToken);
    const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:3000';
    const resetLink = `${frontendUrl}/reset-password?token=${token}`;
    const subject = 'Recuperación de contraseña';
    const text = `Hola,\n\nRecibimos una solicitud para restablecer tu contraseña. Si no fuiste tú, ignora este correo.\n\nPara restablecer tu contraseña, haz clic en el siguiente enlace o pégalo en tu navegador:\n${resetLink}\n\nEste enlace expirará en 15 minutos.`;
    const html = `
      <div style=\"font-family:Arial,sans-serif;max-width:480px;margin:auto;\">
        <h2 style=\"color:#2d3748;\">Recuperación de contraseña</h2>
        <p>Recibimos una solicitud para restablecer tu contraseña. Si no fuiste tú, ignora este correo.</p>
        <a href=\"${resetLink}\" style=\"display:inline-block;padding:12px 24px;background:#3182ce;color:#fff;text-decoration:none;border-radius:4px;font-weight:bold;margin:16px 0;\">Restablecer contraseña</a>
        <p>O copia y pega este enlace en tu navegador:<br><a href=\"${resetLink}\">${resetLink}</a></p>
        <p style=\"color:#888;font-size:12px;\">Este enlace expirará en 15 minutos.</p>
      </div>
    `;
    await this.mailService.sendMail({
      to: user.email,
      subject,
      text,
      html,
    });
    return { message: 'Si el correo está registrado, recibirás instrucciones' };
  }

  async resetPassword(token: string, newPassword: string) {
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const resetToken = await this.resetTokenRepository.findOne({ where: { token: tokenHash }, relations: ['user'] });
    if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
      throw new BadRequestException('Token inválido o expirado');
    }
    const user = resetToken.user;
    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
    resetToken.used = true;
    await this.resetTokenRepository.save(resetToken);
    return { message: 'Contraseña restablecida correctamente' };
  }
}
