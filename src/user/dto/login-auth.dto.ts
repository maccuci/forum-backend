import { ApiProperty } from "@nestjs/swagger";
import { Dto } from "src/lib/dto/Dto";

export class LoginAuthDto extends Dto<LoginAuthDto> {

    @ApiProperty()
    email: string;

    @ApiProperty()
    nickname: string;

    @ApiProperty()
    key: string;
}