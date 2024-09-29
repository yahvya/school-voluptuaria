import { UserRegistrationDatas } from "./user-registration.datas"
import { IsNotEmpty, IsString } from "class-validator"
import { Expose } from "class-transformer"

/**
 * @brief user registration confirmation form datas
 */
export class UserRegistrationConfirmationDatas extends UserRegistrationDatas {
    @IsString()
    @IsNotEmpty()
    @Expose({ name: "encrypted-confirmation-code" })
    /**
     * @brief the sent encrypted confirmation code on the previous step
     */
    public encryptedConfirmationCode: string

    @IsString()
    @IsNotEmpty()
    /**
     * @brief encryption iv
     */
    public iv: string

    @IsString()
    @IsNotEmpty()
    @Expose({ name: "user-confirmation-code" })
    /**
     * @brief provided confirmation code by the user
     */
    public userConfirmationCode: string
}
