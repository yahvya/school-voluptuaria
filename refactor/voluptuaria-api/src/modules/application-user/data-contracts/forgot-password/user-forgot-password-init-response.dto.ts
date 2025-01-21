import { ApiResponseProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

/**
 * User forgot password init process response dto
 */
export class UserForgotPasswordInitResponseDto{
    @ApiResponseProperty()
    @Expose({name: "encrypted_confirmation_code"})
    public encryptedConfirmationCode?: string = null

    @ApiResponseProperty()
    @Expose({name: "encryption_iv"})
    public encryptionIv?: string = null

    @ApiResponseProperty()
    public error?:string = null
}
