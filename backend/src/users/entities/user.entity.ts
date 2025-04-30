import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users')
export class User {
  @ApiProperty({ example: 'ahdshbs541-46wrgwrbv...' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'Tu nombre' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Tu contraseña' })
  @Column()
  password: string;

  @ApiProperty({ example: 'admin o user' })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @ApiProperty({ example: 'true' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ example: '2025-04-29T19:26:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2025-04-29T19:26:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ example: '2025-04-29T19:26:00.000Z' })
  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date | null;
}
