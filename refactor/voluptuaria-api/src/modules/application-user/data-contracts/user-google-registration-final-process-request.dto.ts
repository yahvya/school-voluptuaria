import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator"
import { Expose } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

/**
 * Google registration final process request data contract
 */
export class UserGoogleRegistrationFinalProcessRequestDto{
    @IsString({always: true,})
    @IsNotEmpty({always: true,})
    @IsStrongPassword({
        minLength: 8,
        minSymbols: 1,
        minUppercase: 1
    })
    @ApiProperty({description: "User chosen password"})
    public password: string

    @IsString()
    @IsNotEmpty()
    @Expose({name: "encryption_iv"})
    @ApiProperty({description: "Encryption iv",name: "encryption_iv"})
    public iv: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "Registration from google encrypted data"})
    public datas: string
}
