import {IsEmail, IsNotEmpty, IsString, IsStrongPassword} from "class-validator";

/**
 * @brief User registration form datas.
 */
export class UserRegistrationDatas {
    @IsString({
        always: true,
        message: "error.bad-fields"
    })
    @IsNotEmpty({
        always: true,
        message: "error.bad-fields"
    })
    @IsEmail()
    public email: string;

    @IsString({
        always: true,
        message: "error.bad-fields"
    })
    @IsNotEmpty({
        always: true,
        message: "error.bad-fields"
    })
    public name: string;

    @IsString({
        always: true,
        message: "error.bad-fields"
    })
    @IsNotEmpty({
        always: true,
        message: "error.bad-fields"
    })
    public firstname: string;

    @IsString({
        always: true,
        message: "error.bad-fields"
    })
    @IsNotEmpty({
        always: true,
        message: "error.bad-fields"
    })
    @IsStrongPassword({
        minLength: 8,
        minSymbols: 1,
        minUppercase: 1,
        minNumbers: 1
    })
    public password: string;
}