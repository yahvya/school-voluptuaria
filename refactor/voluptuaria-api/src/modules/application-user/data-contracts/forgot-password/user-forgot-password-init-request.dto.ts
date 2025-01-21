import { IsEmail } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

/**
 * User forgot password init process request dto
 */
export class UserForgotPasswordInitRequestDto{
    @IsEmail({},{message: "Please provide a valid email"})
    @ApiProperty({description: "User email"})
    public email: string
}
