import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '@prisma/client';

// this interface fixes the warnings for context.switchToHttp().getRequest() in line 27
interface RequestWithUser extends Request {
  user?: { role: Role }; // optionally can be added more like id, email, etc.
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // if no roles required, allow access. That means @Roles(Role.ADMIN/USER)/empty @Roles()/ Roles is not added before the handler which means anyone with valid token can access it
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    // const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('You do not have permission for this resource');
    }

    return true;
  }
}
