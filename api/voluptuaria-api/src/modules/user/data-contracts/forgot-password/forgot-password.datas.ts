import { IsNotEmpty, IsString } from "class-validator"

/**
 * @brief forgot password form fields
 */
export class ForgotPasswordDatas {
    @IsString()
    @IsNotEmpty()
    public email: string
}
