import {
    Body,
    Controller,
    HttpCode,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { UserProfileImageDatas } from "../data-contracts/user-informations/user-profile-image.datas"
import { UserProfileImageResponseDatas } from "../data-contracts/user-informations/user-profile-image-response.datas"
import { UserInformationsService } from "../services/user-informations.service"
import { VoluptuariaAuthGuard } from "../../../commons/guards/voluptuaria-auth.guard"
import { JwtAuthGuard } from "../../../commons/guards/jwt-auth.guard"

/**
 * @brief user information's management controller
 */
@Controller("user")
export class UserInformationsController {
    constructor(
        protected readonly userInformationService: UserInformationsService,
    ) {}
    /**
     * @brief update user profile image
     * @param image new image
     * @param profileImageDatas form datas
     */
    @Post("profile-image")
    @HttpCode(200)
    @UseGuards(VoluptuariaAuthGuard)
    @UseGuards(JwtAuthGuard)
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
}
