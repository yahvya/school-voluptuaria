import { IsArray, IsBoolean, IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator"
import { CoordinatesDatas } from "../../google-maps-place/data-contracts/coordinates.datas"
import {CategoriesDatas} from "../../google-maps-place/data-contracts/categories.datas"
import { CommentDatas } from "../../application-dev-testing/tmp/comments.datas"
import {ImagesDatas} from "../../google-maps-place/data-contracts/images.datas"
import { Type } from "class-transformer"
import { ForecastDatas } from "../../openwheatermap/data-contracts/forecast.datas"
import { CommentsDatas } from "../../google-maps-place/data-contracts/comments.datas"
import { WeatherDatas } from "../../openwheatermap/data-contracts/weather.datas"

/**
 * @brief search place information response
 */
export class SearchPlaceResponseData {

    @IsNotEmpty()
    @IsString()
    public access_id: string | null = null;

    @IsNotEmpty()
    @Object()
    public prices:object

    @IsNotEmpty()
    @IsString()
    public place_name: string

    @IsNotEmpty()
    @IsBoolean()
    public is_opened_now: boolean

    @IsNotEmpty()
    @IsArray()
    public image: Array<ImagesDatas>

    @IsNotEmpty()
    @IsObject()
    public coordinates: CoordinatesDatas

    @IsNotEmpty()
    @IsArray()
    public categories: Array<CategoriesDatas>

    @IsNotEmpty()
    @IsObject()
    public callback_datas: object

    @IsNotEmpty()
    @IsArray()
    public comments: CommentsDatas[]

    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => ForecastDatas)
    public weather: WeatherDatas

}


