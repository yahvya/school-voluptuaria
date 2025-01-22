import {
    Body,
    Controller,
    UploadedFile,
    UseGuards,
    Headers,
    HttpCode,
    Post,
    UseInterceptors,
    Get,
} from "@nestjs/common"
import { VoluptuariaAuthGuard } from "../../../commons/guards/voluptuaria-auth.guard"
import { ApplicationAuthenticationGuard } from "../../../commons/guards/application-authentication.guard"
import { ApiConsumes, ApiHeader, ApiResponse } from "@nestjs/swagger"
import { UserLoginResponseDto } from "../data-contracts/login/user-login-response.dto"
import { UserProfileUpdateRequestDto } from "../data-contracts/user-account-management/user-profile-update-request.dto"
import { UserAccountManagementService } from "../services/user-account-management.service"
import { FileInterceptor } from "@nestjs/platform-express"
import { UserWishListUpdateResponseDto } from "../data-contracts/account-management/user-wish-list-update-response.dto"
import { UserWishListUpdateRequestDto } from "../data-contracts/account-management/user-wish-list-update-request.dto"
import { UserWishListGetResponseDto } from "../data-contracts/account-management/user-wish-list-get-response.dto"
import { UserAccountDto } from "../data-contracts/account-management/user-account.dto"

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
    public updateProfileData(@Body() requestDto: UserProfileUpdateRequestDto,@Headers("authentication_token") authenticationToken,@UploadedFile() profilePictureImage?:Express.Multer.File):Promise<UserLoginResponseDto>{
        requestDto.profilePictureImage = profilePictureImage

        return this.userAccountManagementService.updateUserAccountProfileData({
            requestDto: requestDto,
            authenticationToken: authenticationToken
        })
    }

    /**
     * Update user wish list
     * @param requestDto request dto
     * @param authenticationToken authentication token
     */
    @Post("/wish-list/update")
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        type: UserWishListUpdateResponseDto
    })
    public updateWishList(@Body() requestDto:UserWishListUpdateRequestDto,@Headers("authentication_token") authenticationToken:string):Promise<UserWishListUpdateResponseDto>{
        return this.userAccountManagementService.updateUserWishList({requestDto:requestDto,authenticationToken: authenticationToken})
    }

    /**
     * Get user wish list
     * @param authenticationToken authentication token
     * @return {Promise<{UserWishListGetResponseDto>} response
     */
    @Get("/wish-list")
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        type: UserWishListGetResponseDto
    })
    public getUserWishList(@Headers("authentication_token") authenticationToken:string):Promise<UserWishListGetResponseDto>{
        return this.userAccountManagementService.getWishList({authenticationToken: authenticationToken})
    }

    /**
     * Provide user account data
     * @param authenticationToken authentication token
     * @return {Promise<UserAccountDto>} response
     */
    @Get("/")
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        type: UserAccountDto
    })
    public getUserData(@Headers("authentication_token") authenticationToken:string):Promise<UserAccountDto>{
        return this.userAccountManagementService.getAccountData({authenticationToken: authenticationToken})
    }
}
