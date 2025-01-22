import { Expose } from "class-transformer"
import { ApiResponseProperty } from "@nestjs/swagger"

/**
 * User login endpoint response format
 */
export class UserLoginResponseDto {
    @ApiResponseProperty()
    @Expose({name: "authentication_token"})
    public authenticationToken?: string = null

    @ApiResponseProperty()
    public error?: string = null
}
