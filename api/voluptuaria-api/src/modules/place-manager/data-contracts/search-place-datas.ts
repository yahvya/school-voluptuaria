import { IsNotEmpty, IsString } from "class-validator"
import { Expose } from "class-transformer"


/**
 * @brief search place information
 */
export class SearchPlaceDatas {
    @IsNotEmpty()
    @IsString()
    public search:string

    @IsNotEmpty()
    @IsString()
    @Expose({name: "min_rating"})
    public minRating: number
}
