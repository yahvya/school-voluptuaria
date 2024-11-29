import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator"
import { RecommandationsDatas } from "./recommandations.datas"

/**
 * @brief Simple travel route datas
 */
export class SimpleTravelRouteResponseDatas {
    @IsNotEmpty({
        always: true,
    })
    @IsNumber()
    public budget: number

    @IsString({
        always: true,
    })
    @IsNotEmpty({
        always: true,
    })
    public start_date: string

    @IsString({
        always: true,
    })
    @IsNotEmpty({
        always: true,
    })
    public end_date: string

    @IsObject()
    @IsNotEmpty({
        always: true,
    })
    public callback_datas: object | null

    public proposals : RecommandationsDatas[]
}
