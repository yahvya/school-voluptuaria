import { Body, Controller, Headers, HttpCode, Post, UseGuards } from "@nestjs/common"
import { VoluptuariaAuthGuard } from "../../../commons/guards/voluptuaria-auth.guard"
import { ApiHeader } from "@nestjs/swagger"
import { UserRegistrationRequestDto } from "../data-contracts/user-registration-request.dto"
import { UserRegistrationResponseDto } from "../data-contracts/user-registration-response.dto"
import { UserRegistrationService } from "../services/user-registration.service"

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
     * @return {Promise<UserRegistrationResponseDto>} response
     */
    @Post("voluptuaria")
    @HttpCode(200)
    //@UseGuards(VoluptuariaAuthGuard)
    //@ApiHeader({name: "voluptuaria_token",description: "Voluptuaria token"})
    //@ApiHeader({name: "voluptuaria_token_iv",description: "Voluptuaria token iv"})
    public register(@Body() requestDto:UserRegistrationRequestDto,@Headers("lang") lang:string): Promise<UserRegistrationResponseDto> {
        return this.userRegistrationService.registerUser({lang: lang,requestDto: requestDto})
    }
}
