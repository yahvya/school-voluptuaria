import { Body, Controller, Post, Headers, HttpCode } from "@nestjs/common"
import {UserRegistrationService} from "../services/user-registration.service"
import {UserRegistrationDatas} from "../data-contracts/user-registration.datas"
import {UserRegistrationResponseDatas} from "../data-contracts/user-registration-response.datas"
import { UserRegistrationConfirmationDatas } from "../data-contracts/user-registration-confirmation.datas"
import {
    UserRegistrationConfirmationResponseDatas
} from "../data-contracts/user-registration-confirmation-response.datas"

/**
 * @brief Manage users registration process.
 */
@Controller("register")
export class UserRegistrationController {
    constructor(
        protected readonly userRegistrationService: UserRegistrationService
    ) {
    }

    /**
     * @brief Validate user registration datas.
     * @param userRegistrationDatas User registration datas.
     * @param lang lang file name
     * @returns {UserRegistrationResponseDatas} Validation's Result.
     */
    @Post()
    @HttpCode(200)
    public async register(
        @Body() userRegistrationDatas : UserRegistrationDatas,
        @Headers("lang") lang:string
    ) : Promise<UserRegistrationResponseDatas> {
        return await this.userRegistrationService.register({
            userRegistrationDatas: userRegistrationDatas,
            lang: lang
        })
    }

    /**
     * @brief try to confirm and create user account
     * @param userRegistrationConfirmationDatas confirmation datas
     * @returns {Promise<UserRegistrationConfirmationResponseDatas>} confirmation result
     */
    @Post("confirmation")
    @HttpCode(200)
    public async registerConfirmation(
        @Body() userRegistrationConfirmationDatas: UserRegistrationConfirmationDatas
    ):Promise<UserRegistrationConfirmationResponseDatas>{
        return this.userRegistrationService.confirmRegistration({
            userRegistrationConfirmationDatas: userRegistrationConfirmationDatas
        })
    }
}