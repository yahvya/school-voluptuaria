import { Injectable } from "@nestjs/common"
import { ForgotPasswordDatas } from "../data-contracts/forgot-password.datas"
import { ForgotPasswordResponseDatas } from "../data-contracts/forgot-password-response.datas"
import { ForgotPasswordConfirmationDatas } from "../data-contracts/forgot-password-confirmation.datas"
import { ForgotPasswordConfirmationResponseDatas } from "../data-contracts/forgot-password-confirmation-response.datas"
import { InjectRepository } from "@nestjs/typeorm"
import { UserEntity } from "../../database-module/entities/user.entity"
import { Repository } from "typeorm"
import { MailerService } from "@nestjs-modules/mailer"
import { StringService } from "../../utils/services/string.service"
import { EncryptService } from "../../app-security/services/encrypt.service"
import { ConfigService } from "@nestjs/config"
import { LangService } from "../../lang-module/services/lang.service"
import { HashService } from "../../app-security/services/hash.service"

/**
 * @brief forgot password process manager service
 */
@Injectable()
export class ForgotPasswordService{
    constructor(
        @InjectRepository(UserEntity)
        protected readonly userRepository:Repository<UserEntity>,
        protected readonly mailerService:MailerService,
        protected readonly stringService: StringService,
        protected readonly encryptService: EncryptService,
        protected readonly configService: ConfigService,
        protected readonly langService: LangService,
        protected readonly hashService: HashService
    ){
    }

    /**
     * @brief initialise forgot password step
     * @param options options
     * @returns {Promise<ForgotPasswordResponseDatas>} response
     * @throws {Error} on error
     */
    public async init(options: {
        forgotPasswordDatas:ForgotPasswordDatas,
        lang:string
    }):Promise<ForgotPasswordResponseDatas>{
        const {forgotPasswordDatas,lang} = options
        const {email} = forgotPasswordDatas
        const response = new ForgotPasswordResponseDatas()

        // check if user exists
        const user = await this.userRepository.findOneBy({
            email: email
        })

        if(user === null){
            response.errorMessage = "error.unrecognized-email-password"
            return response
        }

        // generate and send confirmation code
        const confirmationCode = this.stringService.random({length: 6})

        if(!await this.sendConfirmationCode({
            email: email,
            confirmationCode: confirmationCode,
            lang: lang
        })){
            response.errorMessage = "error.technical"
            return response
        }

        const encryptionResult = await this.encryptService.encrypt({
            toEncrypt: confirmationCode,
            secretKey: this.configService.getOrThrow("CONFIRMATION_ENCRYPTION_KEY")
        })

        response.confirmationCode = encryptionResult.encryptionResult
        response.iv = encryptionResult.iv

        return response
    }

    /**
     * @brief confirm forgot password process
     * @param options options
     * @returns {Promise<ForgotPasswordConfirmationResponseDatas>} response
     */
    public async confirm(options: {
        forgotPasswordConfirmationDatas:ForgotPasswordConfirmationDatas
    }):Promise<ForgotPasswordConfirmationResponseDatas>{
        const response = new ForgotPasswordConfirmationResponseDatas()
        const {email,newPassword,encryptedConfirmationCode,userConfirmationCode,iv} = options.forgotPasswordConfirmationDatas

        // check if user exists
        const user = await this.userRepository.findOneBy({
            email: email
        })

        if(user === null){
            response.errorMessage = "error.unrecognized-email-password"
            return response
        }

        // check the confirmation code
        const realConfirmationCode = await this.encryptService.decrypt({
            toDecrypt: encryptedConfirmationCode,
            iv: iv,
            secretKey: this.configService.getOrThrow("CONFIRMATION_ENCRYPTION_KEY")
        })

        if(userConfirmationCode !== realConfirmationCode){
            response.errorMessage = "error.bad-confirmation-code"
            return response
        }

        user.password = await this.hashService.hash({
            toHash: newPassword,
            salt: 10
        })

        try{
            await this.userRepository.save(user)
        }
        catch(_){
            response.errorMessage = "error.technical"
        }

        return response
    }

    /**
     * @brief send the confirmation code to the given email
     * @param options options
     * @returns {Promise<boolean>} send success
     */
    protected async sendConfirmationCode(options: {
        email: string,
        confirmationCode: string,
        lang: string
    }):Promise<boolean>{
        try{
            const {email,confirmationCode,lang} = options

            await this
                .mailerService
                .sendMail({
                    to: email,
                    subject: this.langService.translation({
                        langFilename: lang,
                        key: "message.password-forgotten-intro"
                    }),
                    template: "forgot-password-confirmation.hbs",
                    context: {
                        confirmationCode: confirmationCode,
                        appName: this.configService.getOrThrow("APPLICATION_NAME"),
                        websiteUri: this.configService.getOrThrow("APPLICATION_LINK"),
                        lang: lang
                    },
                })

            return true
        }
        catch(_){
            return false
        }
    }
}
