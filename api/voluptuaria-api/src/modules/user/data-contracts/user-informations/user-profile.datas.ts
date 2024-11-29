import { IsOptional, IsString } from "class-validator"
import { Expose } from "class-transformer"

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
    @Expose({name: "birthdate"})
    public birthday: string

    @IsString()
    @IsOptional()
    public phonenumber: string
}
