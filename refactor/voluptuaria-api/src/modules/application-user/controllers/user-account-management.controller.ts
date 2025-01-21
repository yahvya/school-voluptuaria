import { Body, Controller, UploadedFile, UseGuards, Headers, HttpCode, Post, UseInterceptors } from "@nestjs/common"
import { VoluptuariaAuthGuard } from "../../../commons/guards/voluptuaria-auth.guard"
import { ApplicationAuthenticationGuard } from "../../../commons/guards/application-authentication.guard"
import { ApiConsumes, ApiHeader, ApiResponse } from "@nestjs/swagger"
import { UserLoginResponseDto } from "../data-contracts/login/user-login-response.dto"
import { UserProfileUpdateRequestDto } from "../data-contracts/user-account-management/user-profile-update-request.dto"
import { UserAccountManagementService } from "../services/user-account-management.service"
import { FileInterceptor } from "@nestjs/platform-express"

/**
 * User account management controller
 */
@Controller("user/account-data")
@UseGuards(VoluptuariaAuthGuard,ApplicationAuthenticationGuard)
@ApiHeader({name: "voluptuaria_token",description: "Voluptuaria token"})
@ApiHeader({name: "voluptuaria_token_iv",description: "Voluptuaria token iv"})
@ApiHeader({name: "authentication_token",description: "Authentication token"})
export class UserAccountManagementController{
    constructor(
        private userAccountManagementService: UserAccountManagementService
    ) {}

    /**
     * Update profile data
     * @param requestDto request dto
     * @param authenticationToken authentication token
     * @param profilePictureImage new profile picture image
     * @return {Promise<UserLoginResponseDto>} response
     */
    @Post("/update")
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        type: UserLoginResponseDto
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('profile_picture_image'))
    public updateProfileData(@Body() requestDto: UserProfileUpdateRequestDto,@Headers("authentication_token") authenticationToken,@UploadedFile("profile_picture_image") profilePictureImage?:Express.Multer.File):Promise<UserLoginResponseDto>{
        requestDto.profilePictureImage = profilePictureImage

        return this.userAccountManagementService.updateUserAccountProfileData({
            requestDto: requestDto,
            authenticationToken: authenticationToken
        })
    }
}
