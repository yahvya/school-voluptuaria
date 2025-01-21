import { Expose } from "class-transformer"

/**
 * @brief User classic-registration validation response
 */
export class UserRegistrationResponseDatas {
    @Expose({ name: "error_message" })
    public errorMessage: string | null = null

    @Expose({ name: "confirmation_code" })
    public confirmationCode: string | null = null

    public iv: string | null = null
}
