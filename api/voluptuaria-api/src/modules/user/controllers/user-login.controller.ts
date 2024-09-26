import { Controller, Body, Post } from "@nestjs/common"
import { UserLoginService } from '../services/user-login.service'
import {UserLoginResponse} from "../data-contracts/user-login-responses";
import {UserLoginDatas} from "../data-contracts/user-login-datas";

@Controller('login')
export class UserLoginController {
    constructor(private readonly userLoginService: UserLoginService) {
    }

    /**
     * @brief try to log the user
     * @param userLoginDatas login form datas
     * @returns {UserLoginResponse} login response
     */
    @Post()
    public login(@Body() userLoginDatas:UserLoginDatas):Promise<UserLoginResponse>{
        return this.userLoginService.login({
            userLoginDatas: userLoginDatas
        });
    }
}
