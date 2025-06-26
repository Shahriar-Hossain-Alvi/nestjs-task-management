import { ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

export function filterUpdateFieldsByRole(dto: UpdateUserDto, role: Role): Partial<UpdateUserDto> {
  // return all fields if role is admin
  if (role === Role.ADMIN) return dto;

  // return selected fields if role is not admin
  const { fullName, phone, password } = dto;

  if (dto.email || dto.role) {
    throw new ForbiddenException('You do not have permission to update this resource');
  }

  return {
    ...(fullName && { fullName }),
    ...(phone && { phone }),
    ...(password && { password }),
  };
}
