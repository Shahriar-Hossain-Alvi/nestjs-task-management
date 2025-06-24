import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsString()
  fullName: string;

  @IsString()
  phone: string;

  @IsEnum(Role)
  role: Role;
}
