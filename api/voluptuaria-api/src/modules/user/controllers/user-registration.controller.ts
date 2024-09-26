import {Body, Controller, Post,Headers} from "@nestjs/common"
import {UserRegistrationService} from "../services/user-registration.service"
import {UserRegistrationDatas} from "../data-contracts/user-registration.datas"
import {UserRegistrationResponseDatas} from "../data-contracts/user-registration-response.datas"

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
    public async register(
        @Body() userRegistrationDatas : UserRegistrationDatas,
        @Headers("lang") lang:string
    ) : Promise<UserRegistrationResponseDatas> {
        return await this.userRegistrationService.register({
            userRegistrationDatas: userRegistrationDatas,
            lang: lang
        })
    }
}