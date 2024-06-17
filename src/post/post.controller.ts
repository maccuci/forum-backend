import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags("post")
@Controller('post')
export class PostController {

    constructor(private postService: PostService) {}

    @UseGuards(JwtAuthGuard)
    @Post("create")
    async create(@Body() post: CreatePostDto): Promise<PostDto> {
        return this.postService.create(post);
    }
}
