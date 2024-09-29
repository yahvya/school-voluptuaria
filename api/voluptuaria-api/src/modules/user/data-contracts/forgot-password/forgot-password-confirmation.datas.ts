import { IsNotEmpty, IsString } from "class-validator"
import { ForgotPasswordDatas } from "./forgot-password.datas"
import { Expose } from "class-transformer"

/**
 * @brief forgot password confirmation form fields
 */
export class ForgotPasswordConfirmationDatas extends ForgotPasswordDatas {
    @Expose({ name: "encrypted-confirmation-code" })
    @IsString()
    @IsNotEmpty()
    public encryptedConfirmationCode: string

    @Expose({ name: "user-confirmation-code" })
    @IsString()
    @IsNotEmpty()
    public userConfirmationCode: string

    @Expose({ name: "new-password" })
    @IsString()
    @IsNotEmpty()
    public newPassword: string

    @IsString()
    @IsNotEmpty()
    public iv: string
}
