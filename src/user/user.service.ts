import { ConflictException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto): Promise<CreateUserDto> {
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

        return await this.prisma.user.create({
            data: {
                email: data.email
            }
        })
    }
}
