import { IsNotEmpty, IsNumber, IsString } from "class-validator"

/**
 * @brief Simple travel route datas
 */
export class SimpleTravelRouteDatas {
    @IsString({
        always: true,
    })
    @IsNotEmpty({
        always: true,
    })
    public zone : String

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
}
