import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

export interface ReqUserType {
  userId: {
    id: number;
  };
  name: string;
  email: string;
}

export const ReqUser = createParamDecorator(
  (_data: CreateUserDto, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user) {
      throw new BadRequestException('User was not found');
    }

    return user;
  },
);