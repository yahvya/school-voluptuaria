import {Expose} from "class-transformer";


/**
 * @brief User registration validation response
 */
export class UserRegistrationResponseDatas {
    @Expose({ name: 'error-message' })
    public errorMessage: string|null;

    @Expose({ name: 'confirmation-code' })
    public confirmationCode : string|null;
}