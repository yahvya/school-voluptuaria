import { IsNotEmpty, IsOptional, IsString } from "class-validator"

/**
 *@brief user datas for place comments
 */
export class UserDatas {
    @IsString()
    @IsOptional()
    public profilePictureLink: string | null // Can be null without image

    @IsString()
    @IsNotEmpty()
    public fullname: string
}
