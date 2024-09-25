import {UserRegistrationDatas} from "../data-contracts/user-registration-datas";
import {Injectable} from "@nestjs/common";
import {UserRegistrationResponse} from "../data-contracts/user-registration-response";

@Injectable()
export class UserRegistrationService {
    public register(userRegistrationDatas: UserRegistrationDatas): UserRegistrationResponse {

        return new UserRegistrationResponse();
    }
}