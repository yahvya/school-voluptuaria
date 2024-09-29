import { Controller, Body, Post, HttpCode, Headers } from "@nestjs/common"
import { UserLoginService } from "../services/user-login.service"
import { UserLoginResponse } from "../data-contracts/user-login/user-login-responses.datas"
import { UserLoginDatas } from "../data-contracts/user-login/user-login.datas"
import { ForgotPasswordDatas } from "../data-contracts/forgot-password/forgot-password.datas"
import { ForgotPasswordService } from "../services/forgot-password.service"
import { ForgotPasswordResponseDatas } from "../data-contracts/forgot-password/forgot-password-response.datas"
import { ForgotPasswordConfirmationResponseDatas } from "../data-contracts/forgot-password/forgot-password-confirmation-response.datas"
import { ForgotPasswordConfirmationDatas } from "../data-contracts/forgot-password/forgot-password-confirmation.datas"

@Controller("login")
export class UserLoginController {
    constructor(
        protected readonly userLoginService: UserLoginService,
        protected readonly forgotPasswordService: ForgotPasswordService,
    ) {}

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

    /**
     * @brief initialise forgot password step
     * @param forgotPasswordDatas form datas
     * @param lang lang file name
     * @returns {Promise<ForgotPasswordResponseDatas>} response
     */
    @Post("forgot-password")
    @HttpCode(200)
    public forgotPassword(
        @Body() forgotPasswordDatas: ForgotPasswordDatas,
        @Headers("lang") lang: string,
    ): Promise<ForgotPasswordResponseDatas> {
        return this.forgotPasswordService.init({
            forgotPasswordDatas: forgotPasswordDatas,
            lang: lang,
        })
    }

    /**
     * @brief confirm forgot password process
     * @param forgotPasswordConfirmationDatas form datas
     * @returns {Promise<ForgotPasswordConfirmationResponseDatas>} response
     */
    @Post("forgot-password/confirmation")
    @HttpCode(200)
    public forgotPasswordConfirmation(
        @Body()
        forgotPasswordConfirmationDatas: ForgotPasswordConfirmationDatas,
    ): Promise<ForgotPasswordConfirmationResponseDatas> {
        return this.forgotPasswordService.confirm({
            forgotPasswordConfirmationDatas: forgotPasswordConfirmationDatas,
        })
    }
}
