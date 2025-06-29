import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/decorators/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { filterUpdateFieldsByRole } from 'src/common/decorators/utils/user-field-filter';

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

  // get one user
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.findOne(id);
    return plainToInstance(UserEntity, user, { excludeExtraneousValues: true });
  }

  // update a user
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: RequestWithUser, // this is used to get user from request
  ) {
    const user = req.user; // get current logged in user (jwt-strategy)

    console.log('Log request from user controller', user);
    console.log('Log request body user controller', updateUserDto);

    // prevent a user from updating another user
    if (user.role === Role.USER && user.id !== id) {
      throw new ForbiddenException('You do not have permission for this resource');
    }

    // filteredData will return the full object if role is admin & return selected fields if role is USER
    const filteredData = filterUpdateFieldsByRole(updateUserDto, user.role);

    const updatedUser = this.userService.update(id, filteredData);
    return plainToInstance(UserEntity, updatedUser, { excludeExtraneousValues: true });
  }

  // delete a user
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    const deletedUser = this.userService.remove(id);
    return plainToInstance(UserEntity, deletedUser, { excludeExtraneousValues: true });
  }
}
