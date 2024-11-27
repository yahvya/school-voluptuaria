import { IsNumber, IsString } from "class-validator"

/**
 * @brief place comments data contracts
 */
export class PlaceComments {
    @IsString()
    public user_datas : string | null

    @IsString()
    public comment: string

    @IsNumber()
    public rating: number

    @IsString()
    public wroteAt: string
}
