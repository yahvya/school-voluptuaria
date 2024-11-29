import { IsNotEmpty, IsString } from "class-validator"
import { ForgotPasswordDatas } from "./forgot-password.datas"
import { Expose } from "class-transformer"

/**
 * @brief forgot password confirmation form fields
 */
export class ForgotPasswordConfirmationDatas extends ForgotPasswordDatas {
    @Expose({ name: "encrypted_confirmation_code" })
    @IsString()
    @IsNotEmpty()
    public encryptedConfirmationCode: string

    @Expose({ name: "user_confirmation_code" })
    @IsString()
    @IsNotEmpty()
    public userConfirmationCode: string

    @Expose({ name: "new_password" })
    @IsString()
    @IsNotEmpty()
    public newPassword: string

    @IsString()
    @IsNotEmpty()
    @Expose({name: "encryption_iv"})
    public iv: string
}
