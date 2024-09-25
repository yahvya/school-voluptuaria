import {Body, Controller, Post} from "@nestjs/common";
import {UserRegistrationDatas} from "../data-contracts/user-registration-datas";
import {UserRegistrationResponse} from "../data-contracts/user-registration-response";
import {UserRegistrationService} from "../services/user-registration-service";

@Controller('register')
export class UserRegistrationController {

    @Post()
    public register(@Body() userRegistrationDatas : UserRegistrationDatas, userRegistrationService : UserRegistrationService) : UserRegistrationResponse {
        return userRegistrationService.register(userRegistrationDatas);
    }

}