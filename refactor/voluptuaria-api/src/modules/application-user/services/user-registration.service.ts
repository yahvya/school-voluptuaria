import { Injectable } from "@nestjs/common"
import { UserAccountService } from "./user-account.service"
import { UserClassicRegistrationResponseDto } from "../data-contracts/user-classic-registration-response.dto"
import { EncryptionService } from "../../app-security/services/encryption.service"
import { StringService } from "../../utils/services/string.service"
import { ConfigService } from "@nestjs/config"
import { MailerService } from "@nestjs-modules/mailer"
import { LangService } from "../../lang-module/services/lang.service"

/**
 * User registration service
 */
@Injectable()
export class UserRegistrationService{
    constructor(
        private readonly userAccountService:UserAccountService,
        private encryptionService: EncryptionService,
        private stringUtilityService: StringService,
        private configService: ConfigService,
        private mailService: MailerService,
        private langService: LangService
    ) {}

    /**
     * Register a user with voluptuaria logic
     * @param lang lang name
     * @param requestDto request data contract
     * @return {Promise<UserClassicRegistrationResponseDto>} response
     */
    public async registerUser({lang,requestDto}):Promise<UserClassicRegistrationResponseDto>{
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
                secretKey: this.configService.get("SECURITY_ENCRYPTION_SECRET"),
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
                template: "registration-confirmation.hbs",
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
