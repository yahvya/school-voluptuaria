import { Expose } from "class-transformer"

/**
 * @brief user profile image update response
 */
export class UserProfileImageResponseDatas{
    @Expose({name: "error-message"})
    public errorMessage:string|null = null

    @Expose({name: "image-url"})
    public imageUrl:string|null = null
}
