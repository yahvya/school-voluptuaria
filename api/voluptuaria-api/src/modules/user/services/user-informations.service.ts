import { Injectable } from "@nestjs/common"
import { UserProfileImageResponseDatas } from "../data-contracts/user-informations/user-profile-image-response.datas"
import { UserProfileImageDatas } from "../data-contracts/user-informations/user-profile-image.datas"

/**
 * @brief user information management service
 */
@Injectable()
export class UserInformationsService {
    /**
     * @brief update the user profile image
     * @param options options
     * @returns {Promise<UserProfileImageResponseDatas>} upload response
     */
    public async updateUserProfileImage(options: {
        image: Express.Multer.File
        profileImageDatas: UserProfileImageDatas
    }): Promise<UserProfileImageResponseDatas> {
        console.log(options)

        return new UserProfileImageResponseDatas()
    }
}
