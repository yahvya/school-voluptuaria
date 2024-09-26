import {Expose} from "class-transformer";
import {ResponseDataContract} from "./response-data-contract";

/**
 * @brief User registration validation response
 */
export class UserRegistrationResponseDatas extends ResponseDataContract{
    @Expose({name: "error-message"})
    public errorMessage: string|null

    @Expose({name: "confirmation-code"})
    public confirmationCode : string|null
}