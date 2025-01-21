import { Expose } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

/**
 * User forgot password confirmation process request data contract
 */
export class UserForgotPasswordConfirmationRequestDto{
    @Expose({name: "confirmation_iv"})
    @ApiProperty({name: "confirmation_iv",description: "Confirmation iv"})
    public confirmationIv: string

    @Expose({name: "encrypted_confirmation_code"})
    @ApiProperty({name: "encrypted_confirmation_code",description: "Encrypted confirmation code"})
    public encryptedConfirmationCode: string

    @Expose({name: "provided_confirmation_code"})
    @ApiProperty({description: "User provided confirmation code"})
    public providedConfirmationCode: string

    @ApiProperty({description: "User email"})
    public email: string
}
