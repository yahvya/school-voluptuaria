import {UserRegistrationDatas} from "../data-contracts/user-registration-datas";
import {Injectable} from "@nestjs/common";
import {UserRegistrationResponse} from "../data-contracts/user-registration-response";

/**
 * @brief User registration service.
 */
@Injectable()
export class UserRegistrationService {
    /**
     * @brief Validate user registration datas.
     * @param userRegistrationDatas User registration datas.
     * @returns {UserRegistrationResponse} Validation's Result.
     */
    public register(userRegistrationDatas: UserRegistrationDatas): UserRegistrationResponse {
        return new UserRegistrationResponse();
    }
}