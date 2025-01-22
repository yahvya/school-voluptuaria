import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsStrongPassword } from "class-validator"

/**
 * User voluptuaria classic classic-registration request data contract
 */
export class UserClassicRegistrationRequestDto {
    @ApiProperty({description: "User name"})
    public name:string

    @ApiProperty({description: "User firstname"})
    public firstname: string

    @ApiProperty({description: "User email"})
    @IsEmail({},{message: "Please provide a valid email"})
    public email: string

    @ApiProperty({description: "User password"})
    @IsStrongPassword({
        minLength: 8,
        minSymbols: 1,
        minUppercase: 1
    })
    public password: string
}
