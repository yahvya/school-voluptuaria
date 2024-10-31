import { IsNotEmpty, IsNumber, IsString } from "class-validator"


/**
 * @brief search place information
 */
export class SearchPlaceDatas {
    @IsNotEmpty()
    @IsString()
    public research:string

    @IsNotEmpty()
    @IsString()
    public lang : string

    @IsNotEmpty()
    @IsNumber()
    public minRating: number
}
