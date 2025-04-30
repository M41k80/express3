import { Controller, Get, Param, Patch, Delete, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRole } from '../users/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Buscar todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Usuarios encontrados' })
  @ApiResponse({ status: 404, description: 'No se encontraron usuarios' })
  @Get('all')
  async findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  } 
  
  @ApiOperation({ summary: 'Buscar usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findOneById(id);
  }

  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.usersService.remove(id);
  }
}
