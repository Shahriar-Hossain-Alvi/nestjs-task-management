import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'roles'; // A unique key used to store metadata

// (SetMetadata) Built-in NestJS function to attach custom metadata to a route/handler
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// Roles = (...roles: string[])	A custom decorator you can use like @Roles('ADMIN') to attach role data to the handler
