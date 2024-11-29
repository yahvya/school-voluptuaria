import { Expose } from "class-transformer"

/**
 * @brief user registration confirmation response datas
 */
export class UserRegistrationConfirmationResponseDatas {
    @Expose({ name: "error_message" })
    public errorMessage: string | null = null

    @Expose({ name: "authentification_token" })
    public authenticationToken: string | null = null
}
