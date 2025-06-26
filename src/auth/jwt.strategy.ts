import { PassportStrategy } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}

export class JwtStrategy extends PassportStrategy(Strategy) {
  // extends PassportStrategy to Registers this class as a Passport JWT Strategy
  constructor() {
    const options: StrategyOptions = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extract jwt from authorization header (bearer token)
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // secret key to verify the token
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super(options);
  }

  // this function runs after jwt is verified and returns req.user value
  validate(payload: JwtPayload) {
    return { id: payload.sub, email: payload.email, role: payload.role }; // return user as req.user
  }
}
