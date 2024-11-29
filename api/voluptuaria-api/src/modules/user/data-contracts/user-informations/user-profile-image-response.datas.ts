import { Expose } from "class-transformer"

/**
 * @brief user profile image update response
 */
export class UserProfileImageResponseDatas {
    @Expose({ name: "error_message" })
    public errorMessage: string | null = null

    @Expose({ name: "image_url" })
    public imageUrl: string | null = null
}
