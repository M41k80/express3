import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsEnum } from 'class-validator';

export class UpdateHealthProfileDto {
  @ApiPropertyOptional({ example: 28 })
  @IsOptional()
  @IsNumber()
  edad?: number;

  @ApiPropertyOptional({ example: 70.5 })
  @IsOptional()
  @IsNumber()
  peso?: number;

  @ApiPropertyOptional({ example: 175 })
  @IsOptional()
  @IsNumber()
  altura?: number;

  @ApiPropertyOptional({ example: 'femenino', enum: ['masculino', 'femenino', 'otro'] })
  @IsOptional()
  @IsEnum(['masculino', 'femenino', 'otro'])
  genero?: 'masculino' | 'femenino' | 'otro';
}
