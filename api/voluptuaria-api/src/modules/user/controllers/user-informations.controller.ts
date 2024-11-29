import { Body, Controller, Headers, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common"
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
     * @param authenticationToken auth token
     */
    @Post("profile-image")
    @HttpCode(200)
    @UseInterceptors(FileInterceptor("image"))
    public updateImage(
        @UploadedFile() image: Express.Multer.File,
        @Body() profileImageDatas: UserProfileImageDatas,
        @Headers(JwtAuthGuard.AUTHENTICATION_TOKEN_KEY) authenticationToken: string
    ): Promise<UserProfileImageResponseDatas> {
        return this.userInformationService.updateUserProfileImage({
            image: image,
            profileImageDatas: profileImageDatas,
            authenticationToken
        })
    }

    /**
     * @brief valide the user edit password
     * @param editPasswordData user password edit datas
     * @param authenticationToken authentication token
     * @returns {EditPasswordResponse} validation results
     */
    @Post("/change-password")
    @HttpCode(200)
    public editPassword(
        @Body() editPasswordData: EditPasswordDatas,
        @Headers(JwtAuthGuard.AUTHENTICATION_TOKEN_KEY) authenticationToken:string
    ): Promise<EditPasswordResponse> {
        return this.userInformationService.editPassword({
            editPasswordData: editPasswordData,
            authenticationToken: authenticationToken
        })
    }

    /**
     * @brief update user profile
     * @param userProfileDatas profile data
     * @param authenticationToken authentication token
     */
    @Post("profile")
    @HttpCode(200)
    public updateProfile(
        @Headers(JwtAuthGuard.AUTHENTICATION_TOKEN_KEY) authenticationToken:string,
        @Body() userProfileDatas: UserProfileDatas
    ):Promise<UserProfileResponseDatas>{
        return this.userInformationService.updateUserProfile({
            userProfileDatas: userProfileDatas,
            authenticationToken
        })
    }
}
