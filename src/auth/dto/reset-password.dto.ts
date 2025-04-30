import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'token_de_recuperacion' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 'Nueva contraseña' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: 'La contraseña debe tener 5 caracteres y al menos una mayúscula y un carácter especial',
  })
  password: string;
}
