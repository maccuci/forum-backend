import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<CreateUserDto> {
    const existing = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
      select: {
        id: true,
      },
    });

    if (existing) {
      throw new ConflictException('User already exists');
    }

    const postsData = data.posts.map((post) => ({
      title: post.title,
      content: post.content,
      createAt: post.createAt,
      author: { connect: { id: post.authorId } },
    }));

    return await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        key: data.key,
        nickname: data.nickname,
        uid: data.uid,
        invite: data.invite,
        createAt: data.createAt,
        role: data.role,
        avatar: data.avatar,
        posts: { create: postsData },
      },
    });
  }

  async getUserById(id: number): Promise<CreateUserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new ConflictException('User was not found.');
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<CreateUserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new ConflictException('User was not found: ' + email);
    }

    return user;
  }

  // TODO: create later, delete account function
  async delete() {}
}
