import { IsEmail } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

/**
 * User login request dto
 */
export class UserLoginRequestDto{
    @IsEmail({},{message: "Please provide a valid email"})
    @ApiProperty({description: "User email",example: "email@email.com"})
    public email: string

    @ApiProperty({description: "User password",example: "user_pwd"})
    public password: string
}
