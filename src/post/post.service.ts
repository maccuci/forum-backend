import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(post: Omit<PostDto, 'id'>): Promise<PostDto> {
    const data = {
      title: post.title,
      content: post.content,
      author: { connect: { id: post.authorId } },
      createAt: post.createAt,
      comments: {
        create: post.comments.map((comment) => ({
          content: comment.content,
          createAt: comment.createAt,
        })),
      },
    };

    const createdPost = await this.prisma.post.create({
      data,
      include: {
        author: true,
        comments: true,
      },
    });

    const postDto: PostDto = {
      id: createdPost.id,
      title: createdPost.title,
      content: createdPost.content,
      author: createdPost.author,
      authorId: createdPost.authorId,
      createAt: createdPost.createAt,
      comments: createdPost.comments.map((comment) => ({
        id: comment.id,
        postId: comment.postId,
        content: comment.content,
        createAt: comment.createAt,
      })),
    };

    return postDto;
  }
}
