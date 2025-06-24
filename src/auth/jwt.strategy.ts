import { PassportStrategy } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const options: StrategyOptions = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super-secret', // will move to env
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super(options);
  }

  validate(payload: JwtPayload) {
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
