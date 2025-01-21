import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator"
import { Expose } from "class-transformer"

/**
 * @brief google classic-registration confirmation datas
 */
export class GoogleRegistrationConfirmationDatas {
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

    @IsString()
    @IsNotEmpty()
    @Expose({name: "encryption_iv"})
    public iv: string

    @IsString()
    @IsNotEmpty()
    public datas: string
}
