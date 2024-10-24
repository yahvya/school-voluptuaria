import { Injectable } from "@nestjs/common"
import { UserProfileImageResponseDatas } from "../data-contracts/user-informations/user-profile-image-response.datas"
import { UserProfileImageDatas } from "../data-contracts/user-informations/user-profile-image.datas"
import { EditPasswordDatas } from "../data-contracts/user-informations/edit-password.datas"
import { EditPasswordResponse } from "../data-contracts/user-informations/edit-password-response"

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

    /**
     * @brief try to edit user password
     * @param options options
     * @returns {EditPasswordResponse} edit response
     */

    public async editPassword(options: {
        editPasswordData: EditPasswordDatas
    }): Promise<EditPasswordResponse> {
        const {
            new_password,
            confirm_new_password,
            old_password,
        } = options.editPasswordData


        const user = await this.userRepository.findOneBy({
            email: payload.email,
        })
        const response = new EditPasswordResponse()

        // User not exist case
        if (!user) {
            response.errorMessage = "error.invalid-token"
            return response
        }

        //Verify if the old password matches the user's current password
        const oldPasswordMatch = await this.hashService.compare({
            toCompare: old_password,
            hash: user.password,
        })

        if (!oldPasswordMatch) {
            response.errorMessage = "error.same-password"
            return response
        }

        // Check if new password and confirm password not match
        if (new_password !== confirm_new_password) {
            response.errorMessage = "error.matching-password"
            return response
        }

        try {
            await this.userRepository.save({
                user: user,
                password: await this.hashService.hash({
                    toHash: new_password,
                    salt: 10,
                }),
            })
        } catch (_) {
            response.errorMessage = "error.technical"
        }

        return response
    }
}
