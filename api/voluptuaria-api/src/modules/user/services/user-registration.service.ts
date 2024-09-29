import { Injectable } from "@nestjs/common"
import { UserRegistrationDatas } from "../data-contracts/user-registration/user-registration.datas"
import { UserRegistrationResponseDatas } from "../data-contracts/user-registration/user-registration-response.datas"
import { Repository } from "typeorm"
import { Gender, UserEntity } from "../../database-module/entities/user.entity"
import { MailerService } from "@nestjs-modules/mailer"
import { LangService } from "../../lang-module/services/lang.service"
import { InjectRepository } from "@nestjs/typeorm"
import { EncryptService } from "../../app-security/services/encrypt.service"
import { UserRegistrationConfirmationDatas } from "../data-contracts/user-registration/user-registration-confirmation.datas"
import { UserRegistrationConfirmationResponseDatas } from "../data-contracts/user-registration/user-registration-confirmation-response.datas"
import { UserLoginService } from "./user-login.service"
import { HashService } from "../../app-security/services/hash.service"
import { ConfigService } from "@nestjs/config"
import { StringService } from "../../utils/services/string.service"
import { GoogleRegistrationResponseDatas } from "../data-contracts/google-registration/google-registration-response.datas"
import { GoogleRegistrationDatas } from "../data-contracts/google-registration/google-registration.datas"
import { GoogleAuthService } from "../../google-auth-module/services/google-auth.service"
import { GoogleRegistrationConfirmationDatas } from "../data-contracts/google-registration/google-registration-confirmation.datas"
import { GoogleAuthResponse } from "../../google-auth-module/data-contracts/google-auth-response"

/**
 * @brief User registration service.
 */
@Injectable()
export class UserRegistrationService {
    constructor(
        @InjectRepository(UserEntity)
        protected readonly userRepository: Repository<UserEntity>,
        protected readonly mailService: MailerService,
        protected readonly langService: LangService,
        protected readonly encryptService: EncryptService,
        protected readonly loginService: UserLoginService,
        protected readonly hashService: HashService,
        protected readonly configService: ConfigService,
        protected readonly stringService: StringService,
        protected readonly googleAuthService: GoogleAuthService
    ) {}

    /**
     * @brief Validate user registration datas.
     * @param options registration options
     * @returns {UserRegistrationResponseDatas} Validation's Result.
     * @throws {Error} in case of error
     */
    public async register(options: {
        userRegistrationDatas: UserRegistrationDatas
        lang: string
    }): Promise<UserRegistrationResponseDatas> {
        const { lang, userRegistrationDatas } = options
        const response = new UserRegistrationResponseDatas()

        // check if the account already exists
        if (
            (await this.userRepository.findOneBy({
                email: userRegistrationDatas.email,
            })) !== null
        ) {
            response.errorMessage = "error.account-already-exist"
            return response
        }

        // send confirmation mail

        const confirmationCode: string = this.stringService.random({ length: 6 })
        const sendSuccess: boolean = await this.sendConfirmationMail({
            confirmationCode: confirmationCode,
            lang: lang,
            userRegistrationDatas: userRegistrationDatas,
        })

        if (!sendSuccess) {
            response.errorMessage = "error.technical"
            return response
        }

        const encryptionResult = await this.encryptService.encrypt({
            toEncrypt: confirmationCode,
            secretKey: await this.configService.getOrThrow(
                "REGISTRATION_ENCRYPTION_KEY",
            ),
        })

        response.confirmationCode = encryptionResult.encryptionResult
        response.iv = encryptionResult.iv

        return response
    }

    /**
     * @brief try to confirm and create user account
     * @param options options
     * @returns {Promise<UserRegistrationConfirmationResponseDatas>} confirmation result
     * @throws {Error} in case of error
     */
    public async confirmRegistration(options: {
        userRegistrationConfirmationDatas: UserRegistrationConfirmationDatas
    }): Promise<UserRegistrationConfirmationResponseDatas> {
        const response = new UserRegistrationConfirmationResponseDatas()
        const userRegistrationConfirmationDatas = options.userRegistrationConfirmationDatas
        const {
            email,
            iv,
            firstname,
            encryptedConfirmationCode,
            userConfirmationCode,
            password,
            name,
        } = userRegistrationConfirmationDatas

        // check if the account already exists
        if (
            (await this.userRepository.findOneBy({
                email: userRegistrationConfirmationDatas.email,
            })) !== null
        ) {
            response.errorMessage = "error.account-already-exist"
            return response
        }

        // check confirmation code
        const decryptedPassword = await this.encryptService.decrypt({
            toDecrypt: encryptedConfirmationCode,
            secretKey: await this.configService.getOrThrow(
                "REGISTRATION_ENCRYPTION_KEY",
            ),
            iv: iv,
        })

        if (userConfirmationCode !== decryptedPassword) {
            response.errorMessage = "error.bad-confirmation-code"
            return response
        }

        try {
            // create the user
            await this.userRepository.save({
                email: email,
                password: await this.hashService.hash({
                    toHash: password,
                    salt: 10,
                }),
                name: name,
                firstName: firstname,
                gender: Gender.UNDEFINED,
            })

            // log the registered user
            const loginResponse = await this.loginService.login({
                userLoginDatas: {
                    email: email,
                    password: password,
                },
            })

            if (loginResponse.errorMessage !== null) {
                response.errorMessage = loginResponse.errorMessage
                return response
            }

            response.authenticationToken = loginResponse.authenticationToken
        } catch (_) {
            response.errorMessage = "error.technical"
        }

        return response
    }

    /**
     * @brief init the Google authentication process
     * @param options options
     * @returns {GoogleRegistrationResponseDatas} initialization result
     */
    public startRegistrationFromGoogle(options: {
        googleRegistrationDatas:GoogleRegistrationDatas
    }):GoogleRegistrationResponseDatas{
        const response = new GoogleRegistrationResponseDatas()
        const {googleRegistrationDatas} = options
        const {redirectUri} = googleRegistrationDatas

        if(!this.isGoogleRedirectUriValid({uri: redirectUri})){
            response.errorMessage = "error.bad-fields"
            return response
        }

        response.link = this.googleAuthService.generateAuthUrl({
            redirectUri: this.configService.getOrThrow("GOOGLE_CALLBACK_URL"),
            state: Buffer.from(redirectUri).toString("base64")
        })

        return response
    }

    /**
     * @brief get user datas from Google and create the uri to redirect on
     * @param options options
     * @returns {Promise<string|null>} the link to redirect on or null on error
     */
    public async manageGoogleRegistrationRedirect(options: {
        state: string
    }):Promise<string|null>{
        const {state} = options
        const redirectUri= Buffer.from(state,"base64").toString()

        if(!this.isGoogleRedirectUriValid({uri: redirectUri}))
            return null

        const encryptionResult = await this.encryptService.encrypt({
            toEncrypt: JSON.stringify(this.googleAuthService.getUserDatas()),
            secretKey: this.configService.getOrThrow("GOOGLE_REGISTRATION_ENCRYPTION_KEY")
        })
        const params = new URLSearchParams({
            iv: encryptionResult.iv,
            datas: encryptionResult.encryptionResult
        })

        return `${redirectUri}?${params.toString()}`
    }

    /**
     * @brief confirmation google registration by creating account
     * @param options options
     * @returns {Promise<UserRegistrationConfirmationResponseDatas>} confirmation result
     */
    public async confirmGoogleRegistration(options: {
        registrationConfirmationDatas: GoogleRegistrationConfirmationDatas,
    }):Promise<UserRegistrationConfirmationResponseDatas>{
        const response = new UserRegistrationConfirmationResponseDatas()
        const {registrationConfirmationDatas} = options
        const {iv,password,datas} = registrationConfirmationDatas

        // get encrypted datas
        const decryptedDatas = await this.encryptService.decrypt({
            secretKey: this.configService.getOrThrow("GOOGLE_REGISTRATION_ENCRYPTION_KEY"),
            toDecrypt: datas,
            iv: iv
        })

        const userDatas = JSON.parse(decryptedDatas) as GoogleAuthResponse

        // check account don't exist
        const user = await this.userRepository.findOneBy({
            email: userDatas.email
        })

        if(user !== null){
            response.errorMessage = "error.account-already-exist"
            return response
        }

        // create and log user
        try {
            const {email,name,firstname} = userDatas

            await this.userRepository.save({
                email: email,
                password: await this.hashService.hash({
                    toHash: password,
                    salt: 10,
                }),
                name: name,
                firstName: firstname,
                gender: Gender.UNDEFINED,
            })

            // log the registered user
            const loginResponse = await this.loginService.login({
                userLoginDatas: {
                    email: email,
                    password: password,
                },
            })

            if (loginResponse.errorMessage !== null) {
                response.errorMessage = loginResponse.errorMessage
                return response
            }

            response.authenticationToken = loginResponse.authenticationToken
        } catch (_) {
            response.errorMessage = "error.technical"
        }

        return response
    }

    /**
     * @brief send the confirmation mail
     * @param options options
     * @returns {Promise<boolean>} confirmation send success
     */
    protected async sendConfirmationMail(options: {
        confirmationCode: string
        userRegistrationDatas: UserRegistrationDatas
        lang: string
    }): Promise<boolean> {
        try {
            const { confirmationCode, userRegistrationDatas, lang } = options
            const { name, firstname, email } = userRegistrationDatas

            await this.mailService.sendMail({
                to: email,
                subject: this.langService.translation({
                    langFilename: lang,
                    key: "message.welcome-user-intro",
                    replaces: {
                        Username: `${name} ${firstname}`,
                    },
                }),
                template: "registration-confirmation.hbs",
                context: {
                    confirmationCode: confirmationCode,
                    appName: this.configService.getOrThrow("APPLICATION_NAME"),
                    websiteUri: this.configService.getOrThrow("APPLICATION_LINK"),
                    username: `${name} ${firstname}`,
                    lang: lang
                },
            })

            return true
        } catch (_) {
            return false
        }
    }

    /**
     * @brief check if the redirect uri is valid for the application
     * @param options options
     * @todo update this function when the front ap will decide of the format
     */
    protected isGoogleRedirectUriValid(options: {
        uri:string
    }):boolean{
        const {uri} = options

        return uri === this.configService.getOrThrow("GOOGLE_CALLBACK_URL") || true
    }
}
