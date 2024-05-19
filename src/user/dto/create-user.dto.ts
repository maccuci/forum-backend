import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'node:crypto';
import { Dto } from 'src/lib/dto/Dto';
import { PostDto } from 'src/post/dto/post.dto';

export class CreateUserDto extends Dto<CreateUserDto> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

//   @IsString()
//   @IsNotEmpty()
//   key: string;

//   @IsString()
//   @IsNotEmpty()
//   nickname: string;

//   @IsUUID()
//   uid: UUID;

//   @IsString()
//   invite?: string;

//   @IsString()
//   @IsNotEmpty()
//   createAt: Date;

//   @IsString()
//   @IsNotEmpty()
//   role: string;

//   @IsString()
//   @IsNotEmpty()
//   avatar: string;

//   posts: PostDto[];
}
