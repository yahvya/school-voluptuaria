import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../commons/guards/jwt-auth.guard";
import {UserLoginService} from "../services/user-login.service";

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
    getProtected({req}: { req: any }) {
        return {message: 'This is protected data', user: req['user']};
    }

}
