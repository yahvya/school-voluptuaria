import { IsOptional, IsString } from "class-validator"

/**
 * @brief user profile form datas
 */
export class UserProfileDatas{
    @IsString()
    @IsOptional()
    public name: string

    @IsString()
    @IsOptional()
    public firstname: string

    @IsString()
    @IsOptional()
    public birthday: string

    @IsString()
    @IsOptional()
    public phonenumber: string

    public authentication_token: string
}
