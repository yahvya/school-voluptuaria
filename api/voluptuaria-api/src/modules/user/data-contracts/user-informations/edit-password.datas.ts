import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

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
    public new_password: string

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
    public confirm_new_password: string

    @IsNotEmpty({
        always: true,
    })
    @IsString({
        always: true,
    })
    public old_password: string

    @IsNotEmpty({
        always: true,
    })
    @IsString({
        always: true,
    })
    public authentication_token: string
}
