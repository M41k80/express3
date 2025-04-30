import { IsBoolean, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'ahdshbs541-46wrgwrbv...' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'Tu nombre' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  role: UserRole;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: '2025-04-29T19:26:00.000Z' })
  createdAt: Date;
  lastLogin: Date | null;
}
