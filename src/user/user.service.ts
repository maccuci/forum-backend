import { ConflictException, Injectable, ParseUUIDPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto): Promise<CreateUserDto> {
        console.log(data);
        
        const existing = await this.prisma.user.findFirst({
            where: {
                email: data.email
            },
            select: {
                id: true,
            },
        });

        if(existing) {
            throw new ConflictException("User already exists");
        }

        const postsData = data.posts.map(post => ({
            title: post.title,
            content: post.content,

            author: { connect: { id: post.authorId } }
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
                posts: { create: postsData }
            }
        })
    }
}

