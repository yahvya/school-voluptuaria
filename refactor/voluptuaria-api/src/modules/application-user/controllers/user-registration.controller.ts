import { Body, Controller, Get, Headers, HttpCode, Post, Query, Res, UseGuards } from "@nestjs/common"
import { VoluptuariaAuthGuard } from "../../../commons/guards/voluptuaria-auth.guard"
import { ApiHeader, ApiResponse } from "@nestjs/swagger"
import { UserClassicRegistrationRequestDto } from "../data-contracts/user-classic-registration-request.dto"
import { UserClassicRegistrationResponseDto } from "../data-contracts/user-classic-registration-response.dto"
import { UserRegistrationService } from "../services/user-registration.service"
import { UserLoginRequestDto } from "../data-contracts/user-login-request.dto"
import {
    UserClassicRegistrationConfirmationRequestDto
} from "../data-contracts/user-classic-registration-confirmation-request.dto"
import { UserLoginResponseDto } from "../data-contracts/user-login-response.dto"
import { UserGoogleRegistrationInitResponseDto } from "../data-contracts/user-google-registration-init-response.dto"
import { UserGoogleRegistrationInitRequestDto } from "../data-contracts/user-google-registration-init-request.dto"
import { AuthGuard } from "@nestjs/passport"
import { Response } from "express"
import {
    UserGoogleRegistrationFinalProcessRequestDto
} from "../data-contracts/user-google-registration-final-process-request.dto"

/**
 * User registration controller
 */
@Controller("user/registration")
export class UserRegistrationController{
    constructor(
        private readonly userRegistrationService: UserRegistrationService
    ) {}

    /**
     * Init the voluptuaria basic registration process
     * @param requestDto request dto
     * @param lang lang
     * @return {Promise<UserClassicRegistrationResponseDto>} response
     */
    @Post("voluptuaria")
    @HttpCode(200)
    @UseGuards(VoluptuariaAuthGuard)
    @ApiHeader({name: "voluptuaria_token",description: "Voluptuaria token"})
    @ApiHeader({name: "voluptuaria_token_iv",description: "Voluptuaria token iv"})
    @ApiResponse({
        status: 200,
        type: UserClassicRegistrationResponseDto
    })
    public registration(@Body() requestDto:UserClassicRegistrationRequestDto, @Headers("lang") lang:string): Promise<UserClassicRegistrationResponseDto> {
        return this.userRegistrationService.classicallyRegisterUser({lang: lang,requestDto: requestDto})
    }

    /**
     * Confirm the voluptuaria basic registration process
     * @param requestDto request dto
     * @return {Promise<UserLoginRequestDto>} response
     */
    @Post("voluptuaria/confirm")
    @HttpCode(200)
    @UseGuards(VoluptuariaAuthGuard)
    @ApiHeader({name: "voluptuaria_token",description: "Voluptuaria token"})
    @ApiHeader({name: "voluptuaria_token_iv",description: "Voluptuaria token iv"})
    @ApiResponse({
        status: 200,
        type: UserLoginResponseDto
    })
    public registrationConfirmation(@Body() requestDto:UserClassicRegistrationConfirmationRequestDto): Promise<UserLoginResponseDto> {
        return this.userRegistrationService.classicallyConfirmUserRegistration({requestDto: requestDto})
    }

    /**
     * Start the Google registration process
     * @returns {UserGoogleRegistrationInitResponseDto} response
    */
    @Post("by-google")
    @HttpCode(200)
    @UseGuards(VoluptuariaAuthGuard)
    @ApiHeader({name: "voluptuaria_token",description: "Voluptuaria token"})
    @ApiHeader({name: "voluptuaria_token_iv",description: "Voluptuaria token iv"})
    @ApiResponse({
        status: 200,
        type: UserGoogleRegistrationInitResponseDto
    })
    public startRegistrationFromGoogle(@Body() requestDto:UserGoogleRegistrationInitRequestDto): UserGoogleRegistrationInitResponseDto {
        return this.userRegistrationService.initGoogleRegistration({requestDto: requestDto})
    }

    /**
     * Confirm google redirection
     * @param state Added state in the datas
     * @param res response
     * @returns {Promise<any>} registration confirmation
     */
    @Get("by-google/redirect")
    @HttpCode(200)
    @UseGuards(AuthGuard("google"))
    public async googleRegistrationConfirmUri(@Query("state") state: string,@Res() res: Response,): Promise<any> {
        const uri = await this.userRegistrationService.manageGoogleRegistrationRedirect({state: state})
        if (uri === null)
            return "An error occurred during the process"

        return res.redirect(uri)
    }

    /**
     * Confirm user registration from Google
     * @param requestDto confirmation datas
     * @returns {Promise<>} confirmation result
     */
    @Post("by-google/confirmation")
    @HttpCode(200)
    @UseGuards(VoluptuariaAuthGuard)
    public async confirmGoogleRegistration(@Body() requestDto: UserGoogleRegistrationFinalProcessRequestDto): Promise<UserLoginResponseDto> {
        return this.userRegistrationService.processGoogleRegistrationFinalProcess({requestDto: requestDto})
    }
}
