import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

/**
 * @brief google registration confirmation datas
 */
export class GoogleRegistrationConfirmationDatas{
    @IsString({
        always: true,
        message: "error.bad-fields",
    })
    @IsNotEmpty({
        always: true,
        message: "error.bad-fields",
    })
    @IsStrongPassword({
        minLength: 8,
        minSymbols: 1,
        minUppercase: 1,
        minNumbers: 1,
    })
    public password:string

    @IsString()
    @IsNotEmpty()
    public iv:string

    @IsString()
    @IsNotEmpty()
    public datas:string
}
