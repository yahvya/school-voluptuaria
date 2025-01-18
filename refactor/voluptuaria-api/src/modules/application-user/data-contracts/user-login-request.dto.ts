import { IsEmail } from "class-validator"

/**
 * User login request dto
 */
export class UserLoginRequestDto{
    @IsEmail(null,{message: "Please provide a valid email"})
    public email: string

    public password: string
}
