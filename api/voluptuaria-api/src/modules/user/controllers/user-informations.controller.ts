import { Body, Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { UserProfileImageDatas } from "../data-contracts/user-informations/user-profile-image.datas"
import { UserProfileImageResponseDatas } from "../data-contracts/user-informations/user-profile-image-response.datas"
import { UserInformationsService } from "../services/user-informations.service"
import { VoluptuariaAuthGuard } from "../../../commons/guards/voluptuaria-auth.guard"
import { JwtAuthGuard } from "../../../commons/guards/jwt-auth.guard"
import { EditPasswordDatas } from "../data-contracts/user-informations/edit-password.datas"
import { EditPasswordResponse } from "../data-contracts/user-informations/edit-password-response"
import { UserProfileDatas } from "../data-contracts/user-informations/user-profile.datas"
import { UserProfileResponseDatas } from "../data-contracts/user-informations/user-profile-response.datas"

/**
 * @brief user information's management controller
 */
@Controller("user")
@UseGuards(VoluptuariaAuthGuard)
@UseGuards(JwtAuthGuard)
export class UserInformationsController {
    constructor(
        protected readonly userInformationService: UserInformationsService,
    ) {
    }

    /**
     * @brief update user profile image
     * @param image new image
     * @param profileImageDatas form datas
     */
    @Post("profile-image")
    @HttpCode(200)
    @UseInterceptors(FileInterceptor("image"))
    public updateImage(
        @UploadedFile() image: Express.Multer.File,
        @Body() profileImageDatas: UserProfileImageDatas,
    ): Promise<UserProfileImageResponseDatas> {
        return this.userInformationService.updateUserProfileImage({
            image: image,
            profileImageDatas: profileImageDatas,
        })
    }

    /**
     * @brief valide the user edit password
     * @param editPasswordData user password edit datas
     * @returns {EditPasswordResponse} validation results
     */
    @Post()
    @HttpCode(200)
    public edit_password(
        @Body() editPasswordData: EditPasswordDatas,
    ): Promise<EditPasswordResponse> {
        return this.userInformationService.editPassword({
            editPasswordData: editPasswordData,
        })
    }

    @Post("profile")
    @HttpCode(200)
    public updateProfile(
        @Body() userProfileDatas: UserProfileDatas
    ):Promise<UserProfileResponseDatas>{
        return this.userInformationService.updateUserProfile({
            userProfileDatas: userProfileDatas
        })
    }
}
