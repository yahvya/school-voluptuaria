/**
 * @brief Response for user password edit
 */
import { Expose } from "class-transformer"

export class EditPasswordResponse {
    @Expose({ name: "error_message" })
    public errorMessage: string | null = null
}
