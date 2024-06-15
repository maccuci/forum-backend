import { Injectable } from '@nestjs/common';
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
    const payload = {
      username: user.email,
      sub: { id: user.email },
    };

    const authUser = new AuthUserDto({
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      avatar: user.avatar,
    });


    return new LoginResDto({
      user: { ...authUser },
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '60d',
      }),
    });
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
