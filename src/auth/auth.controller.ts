import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard) // for protected routes
  @Get('me')
  async getProfile(@Req() req: { user: User }) {
    const userId = req.user.id;
    const fullUser = await this.authService.getLoggedInUserData(userId);

    return plainToInstance(UserEntity, fullUser, { excludeExtraneousValues: true });
  }
}
