import { Body, Controller, HttpCode, Post, UploadedFile, UseInterceptors } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { UserProfileImageDatas } from "../data-contracts/user-profile-image.datas"

/**
 * @brief user information's management controller
 */
@Controller("user")
export class UserInformationsController{
    /**
     * @brief update user profile image
     * @param image new image
     * @param profileImageDatas form datas
     */
    @Post("profile-image")
    @HttpCode(200)
    @UseInterceptors(FileInterceptor("image"))
    public updateImage(
        @UploadedFile() image:Express.Multer.File,
        @Body() profileImageDatas:UserProfileImageDatas
    ):string{
        console.log(image,profileImageDatas)
        return "bonjour"
    }
}
