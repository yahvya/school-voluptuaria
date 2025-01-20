import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsStrongPassword } from "class-validator"

/**
 * User voluptuaria classic registration request data contract
 */
export class UserClassicRegistrationRequestDto {
    @ApiProperty({name: "name",description: "User name"})
    public name:string

    @ApiProperty({name: "firstname",description: "User firstname"})
    public firstname: string

    @ApiProperty({name: "email",description: "User email"})
    @IsEmail({},{message: "Please provide a valid email"})
    public email: string

    @ApiProperty({name: "password",description: "User password"})
    @IsStrongPassword({
        minLength: 8,
        minSymbols: 1,
        minUppercase: 1
    })
    public password: string
}
