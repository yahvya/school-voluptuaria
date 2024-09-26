import {Injectable} from "@nestjs/common";
import {UserRegistrationDatas} from "../data-contracts/user-registration.datas";
import {UserRegistrationResponseDatas} from "../data-contracts/user-registration-response.datas";
import {Repository} from "typeorm"
import { UserEntity } from "../../database-module/entities/user.entity"
import { MailerService } from "@nestjs-modules/mailer"
import { LangService } from "../../lang-module/services/lang.service"
import { InjectRepository } from "@nestjs/typeorm"

/**
 * @brief User registration service.
 */
@Injectable()
export class UserRegistrationService {
    constructor(
        @InjectRepository(UserEntity)
        protected readonly userRepository:Repository<UserEntity>,
        protected readonly mailService:MailerService,
        protected readonly langService:LangService
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

        // check if the account already exists
        if(await this.userRepository.findOneBy({email: userRegistrationDatas.email}) !== null){
            return new UserRegistrationResponseDatas({
                errorMessage: "error.account-already-exist",
                confirmationCode: null
            })
        }

        // send confirmation mail

        const confirmationCode:string = this.random({length: 6})
        const sendSuccess:boolean = await this.sendConfirmationMail({
            confirmationCode: confirmationCode,
            lang: lang,
            userRegistrationDatas: userRegistrationDatas
        })

        if(!sendSuccess){
            return new UserRegistrationResponseDatas({
                errorMessage: "error.account-already-exist",
                confirmationCode: null
            })
        }

        return new UserRegistrationResponseDatas({
            confirmationCode: confirmationCode,
            errorMessage: null
        });
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