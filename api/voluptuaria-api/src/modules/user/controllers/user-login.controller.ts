import { Controller, Body, Post, HttpCode } from "@nestjs/common"
import { UserLoginService } from "../services/user-login.service"
import { UserLoginResponse } from "../data-contracts/user-login-responses.datas"
import { UserLoginDatas } from "../data-contracts/user-login.datas"

@Controller("login")
export class UserLoginController {
    constructor(private readonly userLoginService: UserLoginService) {}

    /**
     * @brief try to log the user
     * @param userLoginDatas login form datas
     * @returns {UserLoginResponse} login response
     */
    @Post()
    @HttpCode(200)
    public login(
        @Body() userLoginDatas: UserLoginDatas,
    ): Promise<UserLoginResponse> {
        return this.userLoginService.login({
            userLoginDatas: userLoginDatas,
        })
    }
}
