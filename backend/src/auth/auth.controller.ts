import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 409, description: 'El correo ya está registrado' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Cerrar sesión' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada correctamente' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @Post('logout')
  async logout() {
    // Solo frontend borra el token, aquí solo mensaje
    return { message: 'Sesión cerrada correctamente' };
  }

  @ApiOperation({ summary: 'Recordar contraseña' })
  @ApiResponse({ status: 200, description: 'Instrucciones enviadas correctamente' })
  @ApiResponse({ status: 404, description: 'El correo no está registrado' })
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    // Llama al service para generar el token y simular envío
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @ApiOperation({ summary: 'Restablecer contraseña' })
  @ApiResponse({ status: 200, description: 'Contraseña restablecida correctamente' })
  @ApiResponse({ status: 400, description: 'Token inválido o expirado' })
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    // Llama al service para validar token y cambiar contraseña
    return this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.password);
  }
}
