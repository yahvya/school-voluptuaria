import { Expose } from "class-transformer"

/**
 * @brief user profile response datas
 */
export class UserProfileResponseDatas{
    @Expose({name: "error_message"})
    public errorMessage: string = null

    @Expose({name: "authentication_token"})
    public authenticationToken: string = null
}
