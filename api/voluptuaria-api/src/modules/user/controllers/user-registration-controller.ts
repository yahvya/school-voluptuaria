import {Body, Controller, Inject, Post} from "@nestjs/common";
import {UserRegistrationDatas} from "../data-contracts/user-registration-datas";
import {UserRegistrationResponse} from "../data-contracts/user-registration-response";
import {UserRegistrationService} from "../services/user-registration-service";

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
     * @returns {UserRegistrationResponse} Validation's Result.
     */
    @Post()
    public register(
        @Body() userRegistrationDatas : UserRegistrationDatas
    ) : UserRegistrationResponse {
        return this.userRegistrationService.register(userRegistrationDatas);
    }
}