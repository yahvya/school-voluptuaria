import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator"
import { Expose } from "class-transformer"

/**
 * @brief Edit user password form datas.
 */
export class EditPasswordDatas {
    @IsNotEmpty({
        always: true,
    })
    @IsString({
        always: true,
    })
    @IsStrongPassword({
        minLength: 8,
        minSymbols: 1,
        minUppercase: 1,
        minNumbers: 1,
    })
    @Expose({name: "new_password"})
    public newPassword: string

    @IsNotEmpty({
        always: true,
    })
    @IsString({
        always: true,
    })
    @IsStrongPassword({
        minLength: 8,
        minSymbols: 1,
        minUppercase: 1,
        minNumbers: 1,
    })
    @Expose({name: "new_password_confirmation"})
    public newPasswordConfirmation: string

    @IsNotEmpty({
        always: true,
    })
    @IsString({
        always: true,
    })
    @Expose({name: "old_password"})
    public oldPassword: string
}
