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
     * @param options registration options
     * @returns {UserRegistrationResponseDatas} Validation's Result.
     */
    public register(
        options: {userRegistrationDatas: UserRegistrationDatas}
    ): UserRegistrationResponseDatas {
        return new UserRegistrationResponseDatas();
    }
}