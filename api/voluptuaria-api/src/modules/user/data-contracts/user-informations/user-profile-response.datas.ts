import { Expose } from "class-transformer"

/**
 * @brief user profile response datas
 */
export class UserProfileResponseDatas{
    @Expose({name: "error-message"})
    public errorMessage: string = null

    @Expose({name: "authentication-token"})
    public authenticationToken: string = null
}
