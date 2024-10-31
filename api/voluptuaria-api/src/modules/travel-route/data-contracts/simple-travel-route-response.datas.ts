import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator"

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
    public callback_datas: object

    @IsArray()
    @IsNotEmpty({
        always: true,
    })
    public proposal : ProposalDatas[]
}

/**
 * @brief Proposal data contract
 */
class ProposalDatas {

    @IsNotEmpty()
    @IsNumber()
    public order: number

    @IsObject()
    @IsNotEmpty({
        always: true,
    })
    public place: object

    @IsBoolean()
    @IsNotEmpty()
    public is_completed: boolean = false
}
