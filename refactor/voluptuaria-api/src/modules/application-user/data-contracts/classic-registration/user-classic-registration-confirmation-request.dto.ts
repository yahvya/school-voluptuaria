import { UserClassicRegistrationRequestDto } from "./user-classic-registration-request.dto"
import { IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

/**
 * User classic classic-registration request data contract
 */
export class UserClassicRegistrationConfirmationRequestDto extends UserClassicRegistrationRequestDto{
    @IsNotEmpty({message: "Invalid request"})
    @ApiProperty({description: "Iv used to encrypt the sent confirmation code",name: "confirmation_iv"})
    @Expose({name: "confirmation_iv"})
    public confirmationIv: string

    @IsNotEmpty({message: "Invalid request"})
    @ApiProperty({description: "Encrypted confirmation code sent to the user",name: "encrypted_confirmation_code"})
    @Expose({name: "encrypted_confirmation_code"})
    public encryptedConfirmationCode: string

    @IsNotEmpty({message: "Provide the confirmation code"})
    @ApiProperty({description: "User provided confirmation code",name: "provided_confirmation_code"})
    @Expose({name: "provided_confirmation_code"})
    public providedConfirmationCode: string
}
