import { Expose, Type } from "class-transformer"
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsString,
    ValidateNested,
} from "class-validator"
import { ProposalDatas } from "./proposal-datas"

export class UserTravelRouteResponse {
    @IsString()
    @IsNotEmpty()
    public startDate: string

    @IsString()
    @IsNotEmpty()
    public endDate: string

    @IsNumber()
    @IsNotEmpty()
    public budget: number

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProposalDatas)
    public proposals: ProposalDatas[]

    @IsObject()
    public callbackDatas: object
}
