import { Expose } from "class-transformer"

/**
 * User registration response data contract
 */
export class UserRegistrationResponseDto{
    public error?:string = null

    @Expose({name: "confirmation_code"})
    public confirmationCode?: string = null

    @Expose({name: "confirmation_code_iv"})
    public confirmationCodeIv?: string = null
}
