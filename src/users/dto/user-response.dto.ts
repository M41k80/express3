import { UserRole } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'ahdshbs541-46wrgwrbv...' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'Tu nombre' })
  name: string;

  @ApiProperty({ example: 'admin' })
  role: UserRole;

  @ApiProperty({ example: 'true' })
  isActive: boolean;

  @ApiProperty({ example: '2025-04-29T19:26:00.000Z' })
  createdAt: Date;
  lastLogin: Date | null;
}
