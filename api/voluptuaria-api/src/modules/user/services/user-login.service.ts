import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserLoginDatas} from "../data-contracts/user-login-datas";
import {UserLoginResponse} from "../data-contracts/user-login-responses";
import { Repository } from "typeorm"
import {UserEntity} from "../../database-module/entities/user.entity";
import * as bcrypt from "bcrypt";
import {InjectRepository} from "@nestjs/typeorm";

/**
 * @brief Login service
 */
@Injectable()
export class UserLoginService {
    constructor(
        protected readonly jwtService: JwtService,
        @InjectRepository(UserEntity)
        protected readonly userRepository:Repository<UserEntity>
    ) {}

    /**
     * @brief try to log the user
     * @param options options
     * @returns {UserLoginResponse} login response
     */
    public async login(options: { userLoginDatas: UserLoginDatas }): Promise<UserLoginResponse> {
        const {email, password} = options.userLoginDatas;
        const user = await this.userRepository.findOneBy({email:email})

        if (user === null) {
            return new UserLoginResponse({
                errorMessage : 'error.unrecognized-email-password',
                confirmationCode : null
            })
        }

        const passwordMatch = await bcrypt.compare(password,user.password )
        if (passwordMatch == false) {
            return new UserLoginResponse({
                errorMessage : 'error.unrecognized-email-password',
                confirmationCode : null
            })
        }

        const payload = {email : user.email, password: user.password}
        const accessToken = this.generateToken(payload)


        return new UserLoginResponse({
            authenticationToken : accessToken
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
