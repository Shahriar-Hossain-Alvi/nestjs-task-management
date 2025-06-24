import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// uses jwt strategy to protect routes
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
