import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserLoginDatas} from "../data-contracts/user-login-datas";
import {UserLoginResponse} from "../data-contracts/user-login-responses";

/**
 * @brief Login service
 */
@Injectable()
export class UserLoginService {
    constructor(
        protected readonly jwtService: JwtService
    ) {}

    /**
     * @brief try to log the user
     * @param options options
     * @returns {UserLoginResponse} login response
     */
    public login(options: {userLoginDatas: UserLoginDatas}):UserLoginResponse{
        return new UserLoginResponse({
            authenticationToken: this.generateToken({
                email: options.userLoginDatas.email
            })
        });
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
