import { IsNotEmpty, IsString } from "class-validator"

/**
 * @brief google registration confirmation datas
 */
export class GoogleRegistrationConfirmationDatas{
    @IsString()
    @IsNotEmpty()
    public password:string
}
