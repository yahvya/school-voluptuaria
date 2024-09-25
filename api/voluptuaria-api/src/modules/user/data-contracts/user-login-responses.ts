import {Expose} from "class-transformer";
import {ResponseDataContract} from "./response-data-contract";

/**
 * @brief User login validation response
 */
export class UserLoginResponse extends ResponseDataContract{
    @Expose({ name: 'error-message' })
    public errorMessage: string|null;

    @Expose({name: "authentification-token"})
    public authenticationToken:string|null;
}