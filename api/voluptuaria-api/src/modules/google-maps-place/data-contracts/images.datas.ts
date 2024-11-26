import { IsString } from "class-validator"

/**
 * @brief place image datas
 */
export class ImagesDatas {
    @IsString()
    public url: string

    @IsString()
    public description: string
}
