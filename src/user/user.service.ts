import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // does not need now because user is registered with auth
  // create a user
  // async create(createUserDto: CreateUserDto) {
  //   return await this.prisma.user.create({
  //     data: createUserDto,
  //   });
  // }

  // get all users
  async findAll() {
    return await this.prisma.user.findMany();
  }

  // get one user
  async findOne(id: number) {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
