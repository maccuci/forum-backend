import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from 'src/user/dto/auth-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginResDto } from './dto/loginResDto.dto';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = {
      user: user.email,
      sub: { id: user.id },
    };

    const authUser = new AuthUserDto({
      id: String(user.id),
      name: user.name,
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

  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: { id: user.id },
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(email: string, key: string): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new ConflictException('User not found.');
    }

    if (user.key !== key) {
      throw new UnauthorizedException('Key wrong');
    }

    const payload = { sub: user.email, name: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
