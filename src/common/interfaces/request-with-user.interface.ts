import { Role } from '@prisma/client';

// user interface keeps user type clean across controllers, guards, interceptors
export interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    role: Role;
  };
}
