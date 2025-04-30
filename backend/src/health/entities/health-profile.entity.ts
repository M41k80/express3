import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class HealthProfile {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  @ApiProperty({ example: 28 })
  edad: number;

  @Column('float')
  @ApiProperty({ example: 70.5 })
  peso: number;

  @Column('float')
  @ApiProperty({ example: 175 })
  altura: number;

  @Column()
  @ApiProperty({ example: 'femenino', enum: ['masculino', 'femenino', 'otro'] })
  genero: 'masculino' | 'femenino' | 'otro';

  // Puedes agregar aquí más campos según lo que pida el front
}