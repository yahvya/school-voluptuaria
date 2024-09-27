import {
    IsEmail,
    IsNotEmpty,
    IsString
} from "class-validator"

/**
 * @brief User login form datas.
 */
export class UserLoginDatas {
    @IsString({
        always: true,
    })
    @IsNotEmpty({
        always: true,
    })
    @IsEmail()
    public email: string

    @IsString({
        always: true,
    })
    @IsNotEmpty({
        always: true,
    })
    public password: string
}
