import { Body, Controller, Injectable, Post, UseGuards } from "@nestjs/common"
import { VoluptuariaAuthGuard } from "../../../commons/guards/voluptuaria-auth.guard"
import { UserLoginRequestDto } from "../data-contracts/user-login-request.dto"
import { UserLoginResponseDto } from "../data-contracts/user-login-response.dto"
import { UserLoginService } from "../services/user-login.service"
import { ApiHeader } from "@nestjs/swagger"

/**
 * User login controller
 */
@Injectable()
@Controller("user/login")
@ApiHeader({name: "voluptuaria_token",description: "Voluptuaria token"})
@ApiHeader({name: "voluptuaria_token_iv",description: "Voluptuaria token iv"})
@UseGuards(VoluptuariaAuthGuard)
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
    public login(@Body() requestBody: UserLoginRequestDto):Promise<UserLoginResponseDto>{
        return this.userLoginService.logUser({requestDto: requestBody})
    }
}
