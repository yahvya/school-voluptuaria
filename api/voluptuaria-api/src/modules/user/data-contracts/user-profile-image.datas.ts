import { IsNotEmpty, IsOptional, IsString } from "class-validator"

/**
 * @brief user profile image form datas
 */
export class UserProfileImageDatas{
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name:string
}
