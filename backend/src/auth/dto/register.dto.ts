import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Tu nombre' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Tu contraseña' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: 'La contraseña debe tener al menos una mayúscula y un carácter especial',
  })
  password: string;

  @ApiProperty({ example: 'Nuevamente tu contraseña' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: 'La contraseña debe tener al menos una mayúscula y un carácter especial',
  })
  confirmPassword: string;
}
