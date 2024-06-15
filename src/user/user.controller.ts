import { Body, ConflictException, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'node:crypto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  create(@Body() user: CreateUserDto): Promise<CreateUserDto> {
    const createUserDto: CreateUserDto = {
      name: user.name,
      email: user.email,
      nickname: user.nickname,
      key: user.key,
      uid: randomUUID().toString(),
      invite: '-',
      createAt: new Date().toISOString(),
      role: 'member',
      avatar: '-',
      posts: [],
    };

    return this.userService.create(createUserDto);
  }

  @Get("find_email/:email")
  async getUserByEmail(@Param("email") email: string) {
    const user = this.userService.getUserByEmail(email);
  
    if (!user) {
      throw new Error("The user was not found." + email)
    }
  
    return user;
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<CreateUserDto> {
    const userId = parseInt(id);

    if (isNaN(userId)) {
      throw new ConflictException('Invalid user ID.');
    }

    const user = await this.userService.getUserById(userId);
    
    return user;
  }
}
