import { IsBoolean, IsNotEmpty, IsString } from "class-validator"
import { PriceDatas } from "../../google-maps-place/data-contracts/price.datas"
import { CoordinatesDatas } from "../../google-maps-place/data-contracts/coordinates.datas"
import { CategoriesDatas } from "../../google-maps-place/data-contracts/categories.datas"
import { PlaceCommentsDatas } from "./place-comments.datas"
import { WeatherDatas } from "../../openwheatermap/data-contracts/weather.datas"


/**
 * @brief Recommandations data-contracts
 */
export class RecommendationsDatas {
    @IsString({
        always: true,
    })
    @IsNotEmpty({
        always: true,
    })
    public prices: PriceDatas []

    @IsNotEmpty({
        always: true,
    })
    @IsString({
        always: true,
    })
    public name : string

    @IsBoolean()
    public is_opened_now : boolean

    public images : string[]

    public coordinates : CoordinatesDatas

    public categories : CategoriesDatas[]

    public callback_datas : object

    public comments : PlaceCommentsDatas[]

    public weather : WeatherDatas[]

}


