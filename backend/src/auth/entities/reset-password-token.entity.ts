import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ResetPasswordToken {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, { eager: true })
  user: User;

  @ApiProperty({ example: '1234567890' })
  @Column()
  token: string;

  @ApiProperty({ example: '2025-04-30T16:34:57.000Z' })
  @Column()
  expiresAt: Date;

  @ApiProperty({ example: 'false' })
  @Column({ default: false })
  used: boolean;
}
