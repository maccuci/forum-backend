import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'
import { Dto } from "src/lib/dto/Dto";
import { CommentDto } from "./comment.dto";

export class PostDto extends Dto<PostDto> {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    author: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    authorId: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    createAt: string;

    @ApiProperty({ type: CommentDto })
    comment: CommentDto;
}