import {
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
} from "class-validator"
import { Type } from "class-transformer"

export class CommentDatas {
    @IsObject()
    @ValidateNested()
    @Type(() => UserDatas)
    public userDatas: UserDatas

    @IsString()
    @IsNotEmpty()
    public comment: string

    @IsNumber()
    @IsNotEmpty()
    public rating: number

    @IsString()
    @IsNotEmpty()
    public wroteAt: string
}

class UserDatas {
    @IsString()
    @IsOptional()
    public profilePictureLink: string | null // Can be null without image

    @IsString()
    @IsNotEmpty()
    public fullname: string
}
