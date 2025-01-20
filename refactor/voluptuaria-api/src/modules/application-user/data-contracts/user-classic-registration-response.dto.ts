import { Expose } from "class-transformer"
import { ApiResponseProperty } from "@nestjs/swagger"

/**
 * User registration response data contract
 */
export class UserClassicRegistrationResponseDto {
    @ApiResponseProperty()
    public error?:string = null

    @ApiResponseProperty()
    @Expose({name: "confirmation_code"})
    public confirmationCode?: string = null

    @ApiResponseProperty()
    @Expose({name: "confirmation_code_iv"})
    public confirmationCodeIv?: string = null
}
