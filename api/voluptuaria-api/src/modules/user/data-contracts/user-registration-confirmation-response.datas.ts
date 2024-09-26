import { Expose } from "class-transformer"

/**
 * @brief user registration confirmation response datas
 */
export class UserRegistrationConfirmationResponseDatas {
    @Expose({name: "error-message"})
    public errorMessage:string|null = null

    @Expose({name: "authentification-token"})
    public authenticationToken:string|null = null
}