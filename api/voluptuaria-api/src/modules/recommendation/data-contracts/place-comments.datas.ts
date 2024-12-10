import { IsNumber, IsString } from "class-validator"
import { UserDatas } from "./user-datas"

/**
 * @brief place comments data contracts
 */
export class PlaceCommentsDatas {
    @IsString()
    public user_datas : UserDatas

    @IsString()
    public comment: string

    @IsNumber()
    public rating: number

    @IsString()
    public wroteAt: string
}
