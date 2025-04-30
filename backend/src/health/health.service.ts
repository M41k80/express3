import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthProfile } from './entities/health-profile.entity';
import { UpdateHealthProfileDto } from './dto/update-health-profile.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(HealthProfile)
    private readonly healthProfileRepository: Repository<HealthProfile>,
  ) {}

  async findByUser(user: User): Promise<HealthProfile> {
    const profile = await this.healthProfileRepository.findOne({ where: { user: { id: user.id } }, relations: ['user'] });
    if (!profile) throw new NotFoundException('Perfil de salud no encontrado');
    return profile;
  }

  async updateByUser(user: User, dto: UpdateHealthProfileDto): Promise<HealthProfile> {
    let profile = await this.healthProfileRepository.findOne({ where: { user: { id: user.id } }, relations: ['user'] });
    if (!profile) {
      profile = this.healthProfileRepository.create({ user, ...dto });
    } else {
      Object.assign(profile, dto);
    }
    return await this.healthProfileRepository.save(profile);
  }
}
