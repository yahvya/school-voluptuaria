import { Injectable } from "@nestjs/common"
import { UserLoginResponseDto } from "../data-contracts/user-login-response.dto"
import { HashService } from "../../app-security/services/hash.service"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { UserLoginStoredDto } from "../data-contracts/user-login-stored.dto"
import { UserAccountService } from "./user-account.service"
import { UserLoginRequestDto } from "../data-contracts/user-login-request.dto"
import { UserEntity } from "../../database/entities/user.entity"

/**
 * Application user login service
 */
@Injectable()
export class UserLoginService{
    constructor(
        private readonly hashService: HashService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly userAccountService: UserAccountService
    ) {}

    /**
     * Try to log the user
     * @param requestDto request dto
     * @return {Promise<UserLoginResponseDto>} request response
     */
    public async logUser(
        {requestDto}:
        {requestDto:UserLoginRequestDto}
    ):Promise<UserLoginResponseDto>{
        const response = new UserLoginResponseDto()

        try{
            // find the account
            const foundedAccount = await this.userAccountService.findUserFromEmail({email: requestDto.email})

            if(foundedAccount === null){
                response.error = "error.bad-fields"
                return response
            }

            // check credentials validity
            if(!await this.hashService.compare({toCompare: requestDto.password,hash: foundedAccount.password})){
                response.error = "error.bad-fields"
                return response
            }

            // build response
            const authenticationToken = this.buildTokenFromUserEntity({userEntity: foundedAccount as UserEntity})

            if(authenticationToken === null){
                response.error = "error.technical"
                return response
            }

            response.authenticationToken = authenticationToken
        }
        catch(_){
            response.error = "error.technical"
        }

        return response
    }

    /**
     * Build a jwt token from the user entity
     * @param userEntity user entity
     * @return {string|null} built token
     */
    public buildTokenFromUserEntity(
        {userEntity}:
        {userEntity:UserEntity}
    ):string|null{
        try{
            const userLoginStored = new UserLoginStoredDto()
            userLoginStored.email = userEntity.email

            return this.jwtService.sign(Object.assign({},userLoginStored),{
                expiresIn: this.configService.getOrThrow("LOGIN_EXPIRES_TIME")
            })
        }
        catch (_){
            return null
        }
    }
}
