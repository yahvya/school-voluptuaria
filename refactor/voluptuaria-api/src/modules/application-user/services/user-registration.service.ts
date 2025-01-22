import { Injectable } from "@nestjs/common"
import { UserAccountService } from "./user-account.service"
import { UserClassicRegistrationResponseDto } from "../data-contracts/classic-registration/user-classic-registration-response.dto"
import { EncryptionService } from "../../app-security/services/encryption.service"
import { StringService } from "../../utils/services/string.service"
import { ConfigService } from "@nestjs/config"
import { MailerService } from "@nestjs-modules/mailer"
import { LangService } from "../../lang-module/services/lang.service"
import { UserLoginResponseDto } from "../data-contracts/login/user-login-response.dto"
import { UserLoginService } from "./user-login.service"
import { UserEntity } from "../../database/entities/user.entity"
import {
    UserClassicRegistrationConfirmationRequestDto
} from "../data-contracts/classic-registration/user-classic-registration-confirmation-request.dto"
import { HashService } from "../../app-security/services/hash.service"
import { UserClassicRegistrationRequestDto } from "../data-contracts/classic-registration/user-classic-registration-request.dto"
import { UserGoogleRegistrationInitRequestDto } from "../data-contracts/google-registration/user-google-registration-init-request.dto"
import { UserGoogleRegistrationInitResponseDto } from "../data-contracts/google-registration/user-google-registration-init-response.dto"
import { GoogleAuthService } from "../../google-auth-module/services/google-auth.service"
import {
    UserGoogleRegistrationFinalProcessRequestDto
} from "../data-contracts/google-registration/user-google-registration-final-process-request.dto"
import { GoogleAuthResponse } from "../../google-auth-module/data-contracts/google-auth-response"

/**
 * User classic-registration service
 */
@Injectable()
export class UserRegistrationService{
    constructor(
        private readonly userAccountService:UserAccountService,
        private encryptionService: EncryptionService,
        private stringUtilityService: StringService,
        private configService: ConfigService,
        private mailService: MailerService,
        private langService: LangService,
        private userLoginService: UserLoginService,
        private hashService: HashService,
        private googleAuthService: GoogleAuthService
    ) {}

    /**
     * Register a user with voluptuaria logic
     * @param lang lang name
     * @param requestDto request data contract
     * @return {Promise<UserClassicRegistrationResponseDto>} response
     */
    public async classicallyRegisterUser(
        {lang,requestDto}:
        {lang: string,requestDto: UserClassicRegistrationRequestDto}
    ):Promise<UserClassicRegistrationResponseDto>{
        const response = new UserClassicRegistrationResponseDto()

        try{
            // check if user already exist
            const foundedUser = await this.userAccountService.findUserFromEmail({email: requestDto.email})

            if(foundedUser !== null){
                response.error = "error.bad-fields"
                return response
            }

            // generate confirmation code
            const confirmationCode = this.stringUtilityService.random({length: 7})
            const encryptedConfirmationCodeResult = await this.encryptionService.encrypt({
                secretKey: this.configService.getOrThrow("SECURITY_ENCRYPTION_SECRET"),
                toEncrypt: confirmationCode
            })

            // send confirmation mail
            if(!await this.sendConfirmationMail({requestDto: requestDto,lang: lang,confirmationCode: confirmationCode})){
                response.error = "error.technical"
                return response
            }

            response.confirmationCode = encryptedConfirmationCodeResult.encryptionResult
            response.confirmationCodeIv = encryptedConfirmationCodeResult.iv
        }
        catch (_){
            response.error = "error.technical"
        }

        return response
    }

    /**
     * Confirm a user classic-registration with voluptuaria logic and try to log him
     * @param requestDto requestDto
     * @return {Promise<UserLoginResponseDto>} login data
     */
    public async classicallyConfirmUserRegistration(
        {requestDto}:
        {requestDto: UserClassicRegistrationConfirmationRequestDto}
    ):Promise<UserLoginResponseDto>{
        const response = new UserLoginResponseDto()
        try{
            // check the confirmation code validity
            const realDecryptedConfirmationCode = await this.encryptionService.decrypt({
                toDecrypt: requestDto.encryptedConfirmationCode,
                iv: requestDto.confirmationIv,
                secretKey: this.configService.getOrThrow("SECURITY_ENCRYPTION_SECRET")
            })

            if(requestDto.providedConfirmationCode !== realDecryptedConfirmationCode){
                response.error = "error.bad-confirmation-code"
                return response
            }

            // create new user
            let newUserEntity = new UserEntity()

            newUserEntity.userFirstname = requestDto.firstname
            newUserEntity.userName = requestDto.name
            newUserEntity.email = requestDto.email
            newUserEntity.password = await this.hashService.hash({toHash: requestDto.password})

            if(!await this.userAccountService.createUserFromEntity({userEntity: newUserEntity})){
                response.error = "error.technical"
                return response
            }

            // log the user
            response.authenticationToken = this.userLoginService.buildTokenFromUserEntity({userEntity: newUserEntity})
        }
        catch (_){
            response.error = "error.technical"
        }

        return response
    }

    /**
     * Init the Google classic-registration process
     * @param requestDto request
     * @return {UserGoogleRegistrationInitResponseDto} response with the built redirection uri
     */
    public initGoogleRegistration(
        {requestDto}:
        {requestDto:UserGoogleRegistrationInitRequestDto}
    ): UserGoogleRegistrationInitResponseDto{
        const response = new UserGoogleRegistrationInitResponseDto()

        try{
            response.link = this.googleAuthService.generateAuthUrl({
                redirectUri: this.configService.getOrThrow("API_GOOGLE_CALLBACK_URL"),
                state: Buffer.from(requestDto.redirectUri).toString("base64"),
            })
        }
        catch (_){
            response.error = "error.technical"
        }

        return response
    }

    /**
     * Manage google redirection catching
     * @param state past state
     * @return {Promise<string|null>}
     */
    public async manageGoogleRegistrationRedirect(
        {state}:
        {state:string}
    ):Promise<string|null>{
        try{
            const redirectUri = Buffer.from(state, "base64").toString()

            const encryptionResult = await this.encryptionService.encrypt({
                toEncrypt: JSON.stringify(this.googleAuthService.getUserDatas()),
                secretKey: this.configService.getOrThrow("SECURITY_GOOGLE_REGISTRATION_ENCRYPTION_SECRET"),
            })

            const params = new URLSearchParams({
                iv: encryptionResult.iv,
                datas: encryptionResult.encryptionResult,
            })

            return `${redirectUri}?${params.toString()}`
        }
        catch(_){
            return null
        }
    }

    /**
     * Process google classic-registration final process and log the created user
     * @param requestDto request data contract
     * @return
     */
    public async processGoogleRegistrationFinalProcess(
        {requestDto}:
        {requestDto:UserGoogleRegistrationFinalProcessRequestDto}
    ):Promise<UserLoginResponseDto>{
        const response = new UserLoginResponseDto()

        try{
            // load provided data by google
            const decryptedRegistrationData = await this.encryptionService.decrypt({
                secretKey: this.configService.getOrThrow("SECURITY_GOOGLE_REGISTRATION_ENCRYPTION_SECRET"),
                iv: requestDto.iv,
                toDecrypt: requestDto.datas
            })

            const userDatasFromGoogle = JSON.parse(decryptedRegistrationData) as GoogleAuthResponse

            // check account existence
            if(await this.userAccountService.findUserFromEmail({email: userDatasFromGoogle.email}) !== null){
                response.error = "error.account-already-exist"
                return response
            }

            // create user account
            let newUserEntity = new UserEntity()

            newUserEntity.userFirstname = userDatasFromGoogle.firstname
            newUserEntity.userName = userDatasFromGoogle.name
            newUserEntity.email = userDatasFromGoogle.email
            newUserEntity.password = await this.hashService.hash({toHash: requestDto.password})

            const result = await this.userAccountService.createUserFromEntity({userEntity: newUserEntity})

            if(result === false){
                response.error = "error.technical"
                return response
            }

            newUserEntity = result as UserEntity

            // log user
            response.authenticationToken = this.userLoginService.buildTokenFromUserEntity({userEntity: newUserEntity})

            if(response.authenticationToken === null){
                response.error = "error.technical"
                return response
            }
        }
        catch(_){
            response.error = "error.technical"
        }

        return response
    }

    /**
     * Send the confirmation mail
     * @param confirmationCode confirmation code
     * @param requestDto request dto
     * @param lang lang
     * @returns {Promise<boolean>} confirmation send success
     */
    protected async sendConfirmationMail({confirmationCode,requestDto,lang}): Promise<boolean> {
        try {
            const { name, firstname, email } = requestDto

            await this.mailService.sendMail({
                to: email,
                subject: this.langService.translation({
                    langFileName: lang,
                    key: "message.welcome-user-intro",
                    replaces: {
                        Username: `${name} ${firstname}`,
                    },
                }),
                template: "classic-registration-confirmation.hbs",
                context: {
                    confirmationCode: confirmationCode,
                    appName: this.configService.getOrThrow("APPLICATION_NAME"),
                    websiteUri: this.configService.getOrThrow("API_WEBSITE_LINK"),
                    username: `${name} ${firstname}`,
                    lang: lang,
                },
            })

            return true
        } catch (_) {
            return false
        }
    }
}
