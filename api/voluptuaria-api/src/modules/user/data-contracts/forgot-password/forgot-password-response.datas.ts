import { Expose } from "class-transformer"

/**
 * @brief forgot password first step response datas
 */
export class ForgotPasswordResponseDatas{
    @Expose({name: "error-message"})
    public errorMessage:string|null = null

    @Expose({name: "confirmation-code"})
    public confirmationCode:string|null = null

    public iv:string|null = null
}
