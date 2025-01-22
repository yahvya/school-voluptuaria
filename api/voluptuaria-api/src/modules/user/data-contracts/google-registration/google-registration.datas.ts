import { IsNotEmpty } from "class-validator"
import { Expose } from "class-transformer"

/**
 * @brief google classic-registration init datas
 */
export class GoogleRegistrationDatas {
    @IsNotEmpty()
    @Expose({ name: "redirect_url" })
    public redirectUri: string
}
