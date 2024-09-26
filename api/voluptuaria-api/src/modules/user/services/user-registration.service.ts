import {Injectable} from "@nestjs/common";
import {UserRegistrationDatas} from "../data-contracts/user-registration.datas";
import {UserRegistrationResponseDatas} from "../data-contracts/user-registration-response.datas";
import {Repository} from "typeorm"
import { Gender, UserEntity } from "../../database-module/entities/user.entity"
import { MailerService } from "@nestjs-modules/mailer"
import { LangService } from "../../lang-module/services/lang.service"
import { InjectRepository } from "@nestjs/typeorm"
import { EncryptService } from "../../app-security/services/encrypt.service"
import { UserRegistrationConfirmationDatas } from "../data-contracts/user-registration-confirmation.datas"
import {
    UserRegistrationConfirmationResponseDatas
} from "../data-contracts/user-registration-confirmation-response.datas"
import { UserLoginService } from "./user-login.service"

/**
 * @brief User registration service.
 */
@Injectable()
export class UserRegistrationService {
    constructor(
        @InjectRepository(UserEntity)
        protected readonly userRepository:Repository<UserEntity>,
        protected readonly mailService:MailerService,
        protected readonly langService:LangService,
        protected readonly encryptService: EncryptService,
        protected readonly loginService: UserLoginService
    ) {
    }

    /**
     * @brief Validate user registration datas.
     * @param options registration options
     * @returns {UserRegistrationResponseDatas} Validation's Result.
     */
    public async register(
        options: {userRegistrationDatas: UserRegistrationDatas,lang: string}
    ): Promise<UserRegistrationResponseDatas> {
        const {lang,userRegistrationDatas} = options
        const response = new UserRegistrationResponseDatas()

        // check if the account already exists
        if(await this.userRepository.findOneBy({email: userRegistrationDatas.email}) !== null){
            response.errorMessage = "error.account-already-exist"
            return response
        }

        // send confirmation mail

        const confirmationCode:string = this.random({length: 6})
        const sendSuccess:boolean = await this.sendConfirmationMail({
            confirmationCode: confirmationCode,
            lang: lang,
            userRegistrationDatas: userRegistrationDatas
        })

        if(!sendSuccess){
            response.errorMessage = "error.technical"
            return response
        }

        const encryptionResult = await this.encryptService.encrypt({
            toEncrypt: confirmationCode,
            secretKey: "temporary secret key"
        })

        response.confirmationCode = encryptionResult.encryptionResult
        response.iv = encryptionResult.iv

        return response
    }

    /**
     * @brief try to confirm and create user account
     * @param options options
     * @returns {Promise<UserRegistrationConfirmationResponseDatas>} confirmation result
     */
    public async confirmRegistration(options: {userRegistrationConfirmationDatas: UserRegistrationConfirmationDatas}):Promise<UserRegistrationConfirmationResponseDatas> {
        const response = new UserRegistrationConfirmationResponseDatas()
        const userRegistrationConfirmationDatas = options.userRegistrationConfirmationDatas
        const {
            email,
            iv,
            firstname,
            encryptedConfirmationCode,
            userConfirmationCode,
            password,
            name
        } = userRegistrationConfirmationDatas

        // check if the account already exists
        if (await this.userRepository.findOneBy({ email: userRegistrationConfirmationDatas.email }) !== null) {
            response.errorMessage = "error.account-already-exist"
            return response
        }

        // check confirmation code
        const decryptedPassword = await this.encryptService.decrypt({
            toDecrypt: encryptedConfirmationCode,
            secretKey: "temporary secret key",
            iv: iv
        })

        if (userConfirmationCode !== decryptedPassword) {
            response.errorMessage = "error.bad-confirmation-code"
            return response
        }

        try {
            await this.userRepository.save({
                email: email,
                password: password,
                name: name,
                firstName: firstname,
                gender: Gender.UNDEFINED
            })

            const loginResponse = await this.loginService.login({
                userLoginDatas: {
                    email: email,
                    password: password
                }
            })

            if(loginResponse.errorMessage !== null){
                response.errorMessage = loginResponse.errorMessage
                return response
            }

            response.authenticationToken = loginResponse.authenticationToken
        }
        catch(_){
            response.errorMessage = "error.technical"
        }

        return response
    }


    /**
     * @brief send the confirmation mail
     * @param options options
     * @returns {Promise<boolean>} confirmation send success
     */
    protected async sendConfirmationMail(
        options: {confirmationCode:string,userRegistrationDatas: UserRegistrationDatas,lang:string}
    ):Promise<boolean>{
        try{
            const {confirmationCode,userRegistrationDatas,lang} = options
            const {name,firstname,email} = userRegistrationDatas

            await this
                .mailService
                .sendMail({
                    to: email,
                    subject: await this.langService.translation({
                        langFilename: lang,
                        key: "message.welcome-user-intro",
                        replaces: {
                            Username: `${name} ${firstname}`
                        }
                    }),
                    template: "registration-confirmation.hbs",
                    context: {
                        "confirmationCode" : confirmationCode
                    }
                })

            return true
        }
        catch(_){
            return false
        }
    }

    /**
     * @brief generate a random string
     * @param options options
     * @returns {string} the generated string
     * @protected
     */
    protected random(options: {length:number}):string {
        let result:string = ""
        const characters:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        const charactersLength:number = characters.length
        let counter:number = 0

        while (counter < options.length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }

        return result;
    }
}