import { IsNotEmpty, IsString } from "class-validator"

/**
 * @brief search place information
 */
export class SearchPlaceDatas {
    @IsNotEmpty()
    @IsString()
    public research:string
}
