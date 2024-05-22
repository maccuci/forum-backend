import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Dto } from "src/lib/dto/Dto";
import { AuthUserDto } from "src/user/dto/auth-user.dto";

export class LoginResDto extends Dto<LoginResDto> {
    @ApiProperty()
    @IsString()
    accessToken: string;

    @ApiProperty()
    @IsString()
    refreshToken: string;

    @ApiProperty({ type: AuthUserDto })
    user: AuthUserDto;
}