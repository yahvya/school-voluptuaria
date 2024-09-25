import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { UserLoginService } from '../services/user-login.service'
import {JwtAuthGuard} from "../../../commons/guards/jwt-auth.guard";
import {userLoginData} from "../data-contracts/user-login-datas";

/**
 * @brief Manage users login process.
 */
@Controller('login')
export class UserLoginController {
    constructor(private readonly UserLoginService: UserLoginService) {}

    /**
     * @brief Validate user login datas.
     */

    @Post()
    async login(@Body() userLogin: userLoginData) {
        const user = this.UserLoginService.validateUser(userLogin);
        if (!user) {
            return { message: 'Invalid credentials' };
        }
        return this.UserLoginService.generateToken(user);
    }

    // Route protégée
    @UseGuards(JwtAuthGuard)
    @Get()
    getProtected(@Request() req) {
        return {message: 'This is protected data', user: req['user']};
    }

}
