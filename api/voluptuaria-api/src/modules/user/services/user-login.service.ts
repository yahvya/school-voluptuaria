import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { UserLoginDatas } from "../data-contracts/user-login/user-login.datas"
import { UserLoginResponse } from "../data-contracts/user-login/user-login-responses.datas"
import { Repository } from "typeorm"
import { UserEntity } from "../../database-module/entities/user.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { HashService } from "../../app-security/services/hash.service"
import { ConfigService } from "@nestjs/config"
import { EncryptService } from "../../app-security/services/encrypt.service"
import { UserPayloadDatas } from "src/modules/app-security/data-contracts/user-payload.datas"

/**
 * @brief Login service
 */
@Injectable()
export class UserLoginService {
    constructor(
        protected readonly jwtService: JwtService,
        @InjectRepository(UserEntity)
        protected readonly userRepository: Repository<UserEntity>,
        protected readonly hashService: HashService,
        protected readonly configService: ConfigService,
        protected readonly encryptService: EncryptService,
    ) {
    }

    /**
     * @brief try to log the user
     * @param options options
     * @returns {UserLoginResponse} login response
     */
    public async login(options: {
        userLoginDatas: UserLoginDatas
    }): Promise<UserLoginResponse> {
        const { email, password } = options.userLoginDatas
        const user = await this.userRepository.findOneBy({ email: email })
        const response = new UserLoginResponse()

        if (user === null) {
            response.errorMessage = "error.unrecognized-email-password"
            return response
        }

        const passwordMatch = await this.hashService.compare({
            toCompare: password,
            hash: user.password,
        })

        if (passwordMatch === false) {
            response.errorMessage = "error.unrecognized-email-password"
            return response
        }

        const payload = { email: user.email }

        response.authenticationToken = this.generateToken(payload)
        return response
    }

    /**
     * @brief generate the login token
     * @param payload datas
     * @returns {string} the token
     */
    generateToken(payload: UserPayloadDatas): string {
        return this.jwtService.sign(payload, {
            secret: this.configService.getOrThrow("JWT_SECRET"),
        })
    }

    /**
     * @brief verify a token
     * @param token token
     * @returns {UserPayloadDatas} service verification
     */
    validateToken(token: string): UserPayloadDatas {
        try {
            return this.jwtService.verify<UserPayloadDatas>(token)
        } catch (error) {
            return null
        }
    }
}
