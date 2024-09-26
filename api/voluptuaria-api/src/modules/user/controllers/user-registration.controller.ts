import {Body, Controller, Post} from "@nestjs/common"
import {UserRegistrationService} from "../services/user-registration.service"
import {UserRegistrationDatas} from "../data-contracts/user-registration.datas"
import {UserRegistrationResponseDatas} from "../data-contracts/user-registration-response.datas"

/**
 * @brief Manage users registration process.
 */
@Controller('register')
export class UserRegistrationController {
    constructor(
        protected readonly userRegistrationService: UserRegistrationService
    ) {
    }

    /**
     * @brief Validate user registration datas.
     * @param userRegistrationDatas User registration datas.
     * @returns {UserRegistrationResponseDatas} Validation's Result.
     */
    @Post()
    public register(
        @Body() userRegistrationDatas : UserRegistrationDatas
    ) : UserRegistrationResponseDatas
    {
        return this.userRegistrationService.register({
            userRegistrationDatas: userRegistrationDatas
        });
    }
}