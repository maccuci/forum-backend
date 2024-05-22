import { Dto } from "src/lib/dto/Dto";

export class JwtUser extends Dto<JwtUser> {
    name: string;
    userUd: { id: string }
}

export const toUserId = (user: JwtUser) => Number(user.userUd.id)