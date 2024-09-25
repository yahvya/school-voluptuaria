import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { UserLoginService } from '../services/user-login.service'
import {JwtAuthGuard} from "../../../commons/guards/jwt-auth.guard";
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
    public login(@Body() userLoginDatas:UserLoginDatas):UserLoginResponse{
        return this.userLoginService.login({
            userLoginDatas: userLoginDatas
        });
    }
}
