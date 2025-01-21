import { Body, Controller, HttpCode, Injectable, Post, UseGuards,Headers } from "@nestjs/common"
import { VoluptuariaAuthGuard } from "../../../commons/guards/voluptuaria-auth.guard"
import { UserLoginRequestDto } from "../data-contracts/user-login-request.dto"
import { UserLoginResponseDto } from "../data-contracts/user-login-response.dto"
import { UserLoginService } from "../services/user-login.service"
import { ApiHeader, ApiResponse } from "@nestjs/swagger"
import { UserForgotPasswordInitRequestDto } from "../data-contracts/user-forgot-password-init-request.dto"
import { UserForgotPasswordInitResponseDto } from "../data-contracts/user-forgot-password-init-response.dto"
import {
    UserForgotPasswordConfirmationRequestDto
} from "../data-contracts/user-forgot-password-confirmation-request.dto"

/**
 * User login controller
 */
@Injectable()
@Controller("user/login")
@UseGuards(VoluptuariaAuthGuard)
@ApiHeader({name: "voluptuaria_token",description: "Voluptuaria token"})
@ApiHeader({name: "voluptuaria_token_iv",description: "Voluptuaria token iv"})
export class UserLoginController{
    constructor(
        private readonly userLoginService: UserLoginService
    ) {}

    /**
     * Log user
     * @param requestBody request body
     * @return {Promise<UserLoginResponseDto>} response
     */
    @Post("try")
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        type: UserLoginResponseDto
    })
    public login(@Body() requestBody: UserLoginRequestDto):Promise<UserLoginResponseDto>{
        return this.userLoginService.logUser({requestDto: requestBody})
    }

    /**
     * Init user forgot password process
     * @param requestDto request dto
     * @param lang lang
     * @return {Promise<UserForgotPasswordInitResponseDto>} response
     */
    @Post("/forgot-password")
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        type: UserForgotPasswordInitResponseDto
    })
    public initForgotPassword(@Body() requestDto: UserForgotPasswordInitRequestDto,@Headers("lang") lang:string):Promise<UserForgotPasswordInitResponseDto>{
        return this.userLoginService.initForgotPasswordProcess({requestDto: requestDto,lang:  lang})
    }

    /**
     * Confirm user forgot password process
     * @param requestDto request dto
     * @return {Promise<UserLoginResponseDto>} response
     */
    @Post("/forgot-password/confirm")
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        type: UserForgotPasswordConfirmationRequestDto
    })
    public confirmForgotPassword(@Body() requestDto: UserForgotPasswordConfirmationRequestDto):Promise<UserLoginResponseDto>{
        return this.userLoginService.confirmForgotPasswordProcess({requestDto: requestDto})
    }
}
