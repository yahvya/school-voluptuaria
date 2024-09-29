import { Expose } from "class-transformer"

/**
 * @brief forgot password last step response datas
 */
export class ForgotPasswordConfirmationResponseDatas {
    @Expose({ name: "error-message" })
    public errorMessage: string | null = null
}
