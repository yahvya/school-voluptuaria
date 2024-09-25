import {Body, Controller, Post} from "@nestjs/common";
import {UserRegistrationDatas} from "../data-contracts/user-registration-datas";
import {UserRegistrationResponse} from "../data-contracts/user-registration-response";
import {UserRegistrationService} from "../services/user-registration-service";

/**
 * @brief Manage users registration process.
 */
@Controller('register')
export class UserRegistrationController {
    /**
     * @brief Validate user registration datas.
     * @param userRegistrationDatas User registration datas.
     * @param userRegistrationService User registration service.
     * @returns {UserRegistrationResponse} Validation's Result.
     */
    @Post()
    public register(@Body() userRegistrationDatas : UserRegistrationDatas, userRegistrationService : UserRegistrationService) : UserRegistrationResponse {
        return userRegistrationService.register(userRegistrationDatas);
    }

}