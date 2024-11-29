import {  IsOptional, IsString } from "class-validator"

/**
 * @brief user profile image form datas
 */
export class UserProfileImageDatas {
    @IsString()
    @IsOptional()
    name: string
}
