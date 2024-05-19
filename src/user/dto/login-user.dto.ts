import { IsNotEmpty, IsString } from "class-validator";
import { Dto } from "src/lib/dto/Dto";

export class LoginUserDto extends Dto<LoginUserDto> {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    invite?: string;

    @IsString()
    @IsNotEmpty()
    key: string;
}