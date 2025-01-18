import { Expose } from "class-transformer"

/**
 * User login endpoint response format
 */
export class UserLoginResponseDto {
    @Expose({name: "authentication_token"})
    public authenticationToken?: string = null

    public error?: string = null
}
