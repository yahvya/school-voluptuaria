import { Injectable } from "@nestjs/common"
import { ForgotPasswordDatas } from "../data-contracts/forgot-password.datas"
import { ForgotPasswordResponseDatas } from "../data-contracts/forgot-password-response.datas"
import { ForgotPasswordConfirmationDatas } from "../data-contracts/forgot-password-confirmation.datas"
import { ForgotPasswordConfirmationResponseDatas } from "../data-contracts/forgot-password-confirmation-response.datas"

@Injectable()
export class ForgotPasswordService{
    /**
     * @brief initialise forgot password step
     * @param options options
     * @returns {Promise<ForgotPasswordResponseDatas>} response
     */
    public async init(options: {
        forgotPasswordDatas:ForgotPasswordDatas
    }):Promise<ForgotPasswordResponseDatas>{
        return new ForgotPasswordResponseDatas()
    }

    /**
     * @brief confirm forgot password process
     * @param options options
     * @returns {Promise<ForgotPasswordConfirmationResponseDatas>} response
     */
    public async confirm(options: {
        forgotPasswordConfirmationDatas:ForgotPasswordConfirmationDatas
    }):Promise<ForgotPasswordConfirmationResponseDatas>{
        return new ForgotPasswordConfirmationResponseDatas()
    }
}
