import { Controller, Get, Put, Body, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { HealthService } from './health.service';
import { UpdateHealthProfileDto } from './dto/update-health-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthProfile } from './entities/health-profile.entity';
import { JwtUser } from '../interfaces/jwt.interfaces';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface AuthRequest extends Request {
  user: JwtUser;
}

@ApiBearerAuth()
@ApiTags('Health')
@UseGuards(JwtAuthGuard)
@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  
  @ApiOperation({ summary: 'Ver ficha de salud propia' })
  @ApiResponse({ status: 200, description: 'Ficha encontrada' })
  @Get('profile')
  async getProfile(@Request() req: AuthRequest): Promise<HealthProfile> {
    const user = await this.userRepository.findOne({ where: { id: req.user.userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.healthService.findByUser(user);
  }

  @ApiOperation({ summary: 'Actualizar ficha de salud propia' })
  @ApiResponse({ status: 200, description: 'Ficha actualizada' })
  @ApiResponse({ status: 404, description: 'Ficha no encontrada' })
  @Put('profile')
  async updateProfile(@Request() req: AuthRequest, @Body() dto: UpdateHealthProfileDto): Promise<HealthProfile> {
    const user = await this.userRepository.findOne({ where: { id: req.user.userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.healthService.updateByUser(user, dto);
  }
}
