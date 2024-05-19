import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  create(@Body() user: CreateUserDto): Promise<CreateUserDto> {
    const createUserDto: CreateUserDto = {
      name: user.name,
      email: user.email,
      key: user.key,
      nickname: user.nickname,
      uid: user.uid || uuidv4(),
      invite: user.invite,
      createAt: user.createAt,
      role: user.role,
      avatar: user.avatar,
      posts: user.posts,
    };

    return this.userService.create(createUserDto);
  }
}
