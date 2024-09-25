import {IsEmail, IsNotEmpty, IsString, IsStrongPassword} from "class-validator";

/**
 * @brief User login form datas.
 */
export class userLoginData {
    @IsString({
        always : true,
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
    public password: string;
}