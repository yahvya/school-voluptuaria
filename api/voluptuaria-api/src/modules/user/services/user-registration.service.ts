import {Injectable} from "@nestjs/common";
import {UserRegistrationDatas} from "../data-contracts/user-registration.datas";
import {UserRegistrationResponseDatas} from "../data-contracts/user-registration-response.datas";

/**
 * @brief User registration service.
 */
@Injectable()
export class UserRegistrationService {
    /**
     * @brief Validate user registration datas.
     * @param userRegistrationDatas User registration datas.
     * @returns {UserRegistrationResponseDatas} Validation's Result.
     */
    public register(userRegistrationDatas: UserRegistrationDatas): UserRegistrationResponseDatas {
        return new UserRegistrationResponseDatas();
    }
}