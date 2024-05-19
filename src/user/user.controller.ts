import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ReqUser, ReqUserType } from './user.decorator'
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post("create")
    create(@ReqUser() user: CreateUserDto): Promise<CreateUserDto> {
        return this.userService.create(user);
    }

    @Get()
    getHello() {
        return "Hello World"
    }
}
