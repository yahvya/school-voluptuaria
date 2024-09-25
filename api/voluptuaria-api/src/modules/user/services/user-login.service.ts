import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserLoginService {
    constructor(private readonly jwtService: JwtService) {}

    validateUser(username: string, password: string): any {

        const user = { id: 1, username: 'John', password: 'password' };
        if (user.username === username && user.password === password) {
            return user;
        }
        return null;
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
