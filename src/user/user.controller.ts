import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/decorators/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // does not need now because user is registered with auth
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   const user = this.userService.create(createUserDto);
  //   return plainToInstance(UserEntity, user, { excludeExtraneousValues: true });
  // }

  @UseGuards(JwtAuthGuard, RolesGuard) // jwt auth guard checks if user is logged in and RolesGuard checks if user has correct role
  @Roles(Role.ADMIN) // Add which roles are allowed
  @Get()
  findAll() {
    // return this.userService.findAll();
    const users = this.userService.findAll();
    return plainToInstance(UserEntity, users, { excludeExtraneousValues: true });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // return this.userService.findOne(id);
    const user = this.userService.findOne(id);
    return plainToInstance(UserEntity, user, { excludeExtraneousValues: true });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = this.userService.update(id, updateUserDto);
    return plainToInstance(UserEntity, updatedUser, { excludeExtraneousValues: true });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    const deletedUser = this.userService.remove(id);
    return plainToInstance(UserEntity, deletedUser, { excludeExtraneousValues: true });
  }
}
