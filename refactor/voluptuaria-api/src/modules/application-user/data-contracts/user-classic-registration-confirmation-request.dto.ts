import { UserClassicRegistrationRequestDto } from "./user-classic-registration-request.dto"
import { IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

/**
 * User classic registration request data contract
 */
export class UserClassicRegistrationConfirmationRequestDto extends UserClassicRegistrationRequestDto{
    @IsNotEmpty({message: "Invalid request"})
    @ApiProperty({description: "Iv used to encrypt the sent confirmation code"})
    public confirmationIv: string

    @IsNotEmpty({message: "Invalid request"})
    @ApiProperty({description: "Encrypted confirmation code sent to the user"})
    public encryptedConfirmationCode: string

    @IsNotEmpty({message: "Provide the confirmation code"})
    @ApiProperty({description: "User provided confirmation code"})
    public providedConfirmationCode: string
}
