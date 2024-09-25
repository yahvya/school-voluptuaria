import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {userLoginData} from "../data-contracts/user-login-datas";
import {UserLoginResponse} from "../data-contracts/user-login-responses";

@Injectable()
export class UserLoginService {
    constructor(private readonly jwtService: JwtService) {}

    validateUser(userLogin: userLoginData) {

        const user = { id: 1, email: 'John@gmail.com', password: 'password' };
        if (user.email === userLogin.email && user.password === userLogin.password) {
            return user;
        }
        return UserLoginResponse ;
    }
    generateToken(payload: any): string {
        return this.jwtService.sign(payload);
    }

    validateToken(token: string): any {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            return null;
        }
    }
}
