import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginAuthDto } from 'src/user/dto/login-auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'key' });
  }

  async validate(email: string, key: string): Promise<LoginAuthDto> {
    const user: LoginAuthDto = await this.authService.validateUser(email, key);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
