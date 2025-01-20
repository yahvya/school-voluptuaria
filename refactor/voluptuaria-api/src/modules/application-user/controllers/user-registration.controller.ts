import { Body, Controller, Headers, HttpCode, Post, UseGuards } from "@nestjs/common"
import { VoluptuariaAuthGuard } from "../../../commons/guards/voluptuaria-auth.guard"
import { ApiHeader } from "@nestjs/swagger"
import { UserClassicRegistrationRequestDto } from "../data-contracts/user-classic-registration-request.dto"
import { UserClassicRegistrationResponseDto } from "../data-contracts/user-classic-registration-response.dto"
import { UserRegistrationService } from "../services/user-registration.service"
import { UserLoginRequestDto } from "../data-contracts/user-login-request.dto"
import {
    UserClassicRegistrationConfirmationRequestDto
} from "../data-contracts/user-classic-registration-confirmation-request.dto"
import { UserLoginResponseDto } from "../data-contracts/user-login-response.dto"

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
    //@UseGuards(VoluptuariaAuthGuard)
    //@ApiHeader({name: "voluptuaria_token",description: "Voluptuaria token"})
    //@ApiHeader({name: "voluptuaria_token_iv",description: "Voluptuaria token iv"})
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
    //@UseGuards(VoluptuariaAuthGuard)
    //@ApiHeader({name: "voluptuaria_token",description: "Voluptuaria token"})
    //@ApiHeader({name: "voluptuaria_token_iv",description: "Voluptuaria token iv"})
    public registrationConfirmation(@Body() requestDto:UserClassicRegistrationConfirmationRequestDto): Promise<UserLoginResponseDto> {
        return this.userRegistrationService.classicallyConfirmUserRegistration({requestDto: requestDto})
    }
}
