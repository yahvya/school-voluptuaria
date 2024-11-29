import { IsArray, IsBoolean, IsNotEmpty, IsObject, IsString } from "class-validator"
import { CoordinatesDatas } from "../../google-maps-place/data-contracts/coordinates.datas"
import {CategoriesDatas} from "../../google-maps-place/data-contracts/categories.datas"
import {ImagesDatas} from "../../google-maps-place/data-contracts/images.datas"
import { CommentsDatas } from "../../google-maps-place/data-contracts/comments.datas"
import { WeatherDatas } from "../../openwheatermap/data-contracts/weather.datas"

/**
 * @brief search place information response
 */
export class SearchPlaceResponseData {

    @IsNotEmpty()
    @IsString()
    public access_id: string | null = null;

    @IsObject()
    public prices:object


    @IsString()
    public place_name: string


    @IsBoolean()
    public is_opened_now: boolean


    @IsArray()
    public image: Array<ImagesDatas>

    @IsNotEmpty()
    @IsObject()
    public coordinates: CoordinatesDatas


    @IsArray()
    public categories: Array<CategoriesDatas>


    @IsObject()
    public callback_datas: object

    @IsNotEmpty()
    public comments: CommentsDatas[]

    @IsObject()
    public weather: WeatherDatas

}


