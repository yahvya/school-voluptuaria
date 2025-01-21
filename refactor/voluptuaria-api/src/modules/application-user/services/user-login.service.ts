import { Injectable } from "@nestjs/common"
import { UserLoginResponseDto } from "../data-contracts/user-login-response.dto"
import { HashService } from "../../app-security/services/hash.service"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { UserLoginStoredDto } from "../data-contracts/user-login-stored.dto"
import { UserAccountService } from "./user-account.service"
import { UserLoginRequestDto } from "../data-contracts/user-login-request.dto"
import { UserEntity } from "../../database/entities/user.entity"
import { UserForgotPasswordInitRequestDto } from "../data-contracts/user-forgot-password-init-request.dto"
import { UserForgotPasswordInitResponseDto } from "../data-contracts/user-forgot-password-init-response.dto"
import { StringService } from "../../utils/services/string.service"
import { EncryptionService } from "../../app-security/services/encryption.service"
import { MailerService } from "@nestjs-modules/mailer"
import { LangService } from "../../lang-module/services/lang.service"
import {
    UserForgotPasswordConfirmationRequestDto
} from "../data-contracts/user-forgot-password-confirmation-request.dto"

/**
 * Application user login service
 */
@Injectable()
export class UserLoginService{
    constructor(
        private readonly hashService: HashService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly userAccountService: UserAccountService,
        private readonly stringService: StringService,
        private readonly encryptionService: EncryptionService,
        private readonly mailerService: MailerService,
        private readonly langService: LangService
    ) {}

    /**
     * Init forgot password process
     * @param requestDto request dto
     * @param lang lang
     * @return {Promise<UserForgotPasswordInitResponseDto>} response
     */
    public async initForgotPasswordProcess(
        {requestDto,lang}:
        {requestDto:UserForgotPasswordInitRequestDto,lang: string}
    ):Promise<UserForgotPasswordInitResponseDto>{
        const response = new UserForgotPasswordInitResponseDto()

        try{
            // check account existence
            if(await this.userAccountService.findUserFromEmail({email: requestDto.email}) === null){
                response.error = "error.unrecognized-email-password"
                return response
            }

            // generate confirmation code
            const confirmationCode = this.stringService.random({length: 6})
            const confirmationCodeEncryptionResult = await this.encryptionService.encrypt({
                toEncrypt: confirmationCode,
                secretKey: this.configService.getOrThrow("SECURITY_ENCRYPTION_SECRET")
            })

            // send confirmation mail
            if(!await this.sendConfirmationCode({email: requestDto.email,confirmationCode: confirmationCode,lang: lang})){
                response.error = "error.technical"
                return response
            }

            response.encryptionIv = confirmationCodeEncryptionResult.iv
            response.encryptedConfirmationCode = confirmationCodeEncryptionResult.encryptionResult
        }
        catch(_){
            response.error = "error.technical"
        }

        return response
    }

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

    /**
     * Send the confirmation code to the given email
     * @param email user email
     * @param confirmationCode confirmation code
     * @param lang user lang
     * @returns {Promise<boolean>} send success
     */
    protected async sendConfirmationCode(
        {email,confirmationCode,lang}:
        {email:string,confirmationCode:string,lang:string}
    ): Promise<boolean> {
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: this.langService.translation({
                    langFileName: lang,
                    key: "message.password-forgotten-intro",
                }),
                template: "forgot-password-confirmation.hbs",
                context: {
                    confirmationCode: confirmationCode,
                    appName: this.configService.getOrThrow("APPLICATION_NAME"),
                    websiteUri: this.configService.getOrThrow("API_WEBSITE_LINK"),
                    lang: lang,
                },
            })

            return true
        } catch (_) {
            return false
        }
    }

    /**
     * Confirm user forgot password process and log him
     * @param requestDto request dto
     * @return {Promise<UserLoginResponseDto>} login response
     */
    public async confirmForgotPasswordProcess(
        {requestDto}:
        {requestDto:UserForgotPasswordConfirmationRequestDto}
    ):Promise<UserLoginResponseDto>{
        const response = new UserLoginResponseDto()

        try{
            // check confirmation code
            const decryptedConfirmationCode = await this.encryptionService.decrypt({
                toDecrypt: requestDto.encryptedConfirmationCode,
                iv: requestDto.confirmationIv,
                secretKey: this.configService.getOrThrow("SECURITY_ENCRYPTION_SECRET")
            })

            if(decryptedConfirmationCode !== requestDto.providedConfirmationCode){
                response.error = "error.bad-confirmation-code"
                return response
            }

            // get user account and log it
            const userEntity = await this.userAccountService.findUserFromEmail({email: requestDto.email})

            if(userEntity === null){
                response.error = "error.technical"
                return response
            }

            response.authenticationToken = this.buildTokenFromUserEntity({userEntity: userEntity})

            if(response.authenticationToken === null){
                response.error = "error.technical"
                return response
            }
        }
        catch (_){
            response.error = "error.technical"
        }

        return response
    }
}
