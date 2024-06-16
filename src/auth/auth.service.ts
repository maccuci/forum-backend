import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginResDto } from './dto/login-res.dto';
import { AuthUserDto } from 'src/user/dto/auth-user.dto';
import { LoginAuthDto } from 'src/user/dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { sub: user.id, username: user.email };

    const authUser = new AuthUserDto({
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      avatar: user.avatar,
    });

    const login = new LoginResDto({
      user: { ...authUser },
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '60s', //60d
      }),
    });

    return login;
  }

  async createUser(data: CreateUserDto) {
    const user: any = await this.userService.create(data);
    if (user.email) {
      return this.login(user);
    }
  }

  async validateUser(email: string, key: string): Promise<LoginAuthDto> {
    const user: LoginAuthDto = await this.userService.getUserByEmail(email);
    if (user && user.key === key) {
      return user;
    }
    return null;
  }

  async validateRefreshToken(token: string, payload: any): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const user = await this.userService.getUserById(payload.id);
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return user;
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: { id: user.id },
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
