import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

/**
 * @brief User registration form datas.
 */
export class UserRegistrationDatas {
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
    public name: string

    @IsString({
        always: true,
    })
    @IsNotEmpty({
        always: true,
    })
    public firstname: string

    @IsString({
        always: true,
    })
    @IsNotEmpty({
        always: true,
    })
    @IsStrongPassword({
        minLength: 8,
        minSymbols: 1,
        minUppercase: 1,
        minNumbers: 1,
    })
    public password: string
}
