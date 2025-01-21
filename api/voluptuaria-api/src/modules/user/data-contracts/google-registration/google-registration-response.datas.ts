import { Expose } from "class-transformer"

/**
 * @brief google classic-registration response datas
 */
export class GoogleRegistrationResponseDatas {
    @Expose({ name: "error_message" })
    public errorMessage: string | null = null

    public link: string | null = null
}
