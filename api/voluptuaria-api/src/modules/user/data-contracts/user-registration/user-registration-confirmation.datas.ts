import { UserRegistrationDatas } from "./user-registration.datas"
import { IsNotEmpty, IsString } from "class-validator"
import { Expose } from "class-transformer"

/**
 * @brief user registration confirmation form datas
 */
export class UserRegistrationConfirmationDatas extends UserRegistrationDatas {
    @IsString()
    @IsNotEmpty()
    @Expose({ name: "encrypted_confirmation_code" })
    /**
     * @brief the sent encrypted confirmation api on the previous step
     */
    public encryptedConfirmationCode: string

    @IsString()
    @IsNotEmpty()
    @Expose({name: "encryption_iv"})
    /**
     * @brief encryption iv
     */
    public iv: string

    @IsString()
    @IsNotEmpty()
    @Expose({ name: "user_confirmation_code" })
    /**
     * @brief provided confirmation api by the user
     */
    public userConfirmationCode: string
}
