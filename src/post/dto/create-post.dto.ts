import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Dto } from 'src/lib/dto/Dto';
import { CommentDto } from './comment.dto';

export class CreatePostDto extends Dto<CreatePostDto> {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsNotEmpty()
    author: any;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    authorId: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    createAt: string;

    @ApiProperty({ type: [CommentDto] })
    @ValidateNested({ each: true })
    @Type(() => CommentDto)
    comments: CommentDto[];
}
