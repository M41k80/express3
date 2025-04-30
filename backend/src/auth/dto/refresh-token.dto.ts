import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ example: 'token_de_refresh' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
