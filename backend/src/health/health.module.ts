import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthProfile } from './entities/health-profile.entity';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HealthProfile])],
  providers: [HealthService],
  controllers: [HealthController],
  exports: [HealthService],
})
export class HealthModule {}
