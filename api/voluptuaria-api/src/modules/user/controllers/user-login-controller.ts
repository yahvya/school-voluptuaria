import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { UserLoginService } from '../services/user-login.service'
import {JwtAuthGuard} from "../../../commons/guards/jwt-auth.guard";

@Controller('login')
export class UserLoginController {
    constructor(private readonly UserLoginService: UserLoginService) {}

    @Post()
    async login(@Body() body: any) {
        const user = await this.UserLoginService.validateUser(body.username, body.password);
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
