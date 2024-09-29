import { Expose } from "class-transformer"

/**
 * @brief User login validation response
 */
export class UserLoginResponse {
    @Expose({ name: "error-message" })
    public errorMessage: string | null = null

    @Expose({ name: "authentification-token" })
    public authenticationToken: string | null = null
}
