import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.create(createUserDto);
    return plainToInstance(UserEntity, user, { excludeExtraneousValues: true });
  }

  @Get()
  findAll() {
    // return this.userService.findAll();
    const users = this.userService.findAll();
    return plainToInstance(UserEntity, users, { excludeExtraneousValues: true });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // return this.userService.findOne(id);
    const user = this.userService.findOne(id);
    return plainToInstance(UserEntity, user, { excludeExtraneousValues: true });
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = this.userService.update(id, updateUserDto);
    return plainToInstance(UserEntity, updatedUser, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    const deletedUser = this.userService.remove(id);
    return plainToInstance(UserEntity, deletedUser, { excludeExtraneousValues: true });
  }
}
