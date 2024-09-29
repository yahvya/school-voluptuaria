import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
} from "class-validator"
import { Type } from "class-transformer"
import { CommentDatas } from "./comments.datas"
import { ForecastDatas } from "../../openwheatermap/data-contracts/forecast.datas"

export class PlaceDataDatas {
    @IsUUID()
    @IsOptional()
    public accesId: string | null

    @IsNotEmpty()
    @IsObject()
    public prices: object

    @IsString()
    @IsNotEmpty()
    public placeName: string

    @IsBoolean()
    @IsNotEmpty()
    public isOpenedNow: boolean

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImageDatas)
    images: ImageDatas[]

    @ValidateNested()
    @Type(() => CoordinatesDatas)
    coordinates: CoordinatesDatas

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CategoryDatas)
    categories: CategoryDatas[]

    @IsObject()
    @IsNotEmpty()
    public callbackDatas: object

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CommentDatas)
    public comments: CommentDatas

    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => ForecastDatas)
    public weather: ForecastDatas[]
}

class ImageDatas {
    @IsString()
    @IsNotEmpty()
    public url: string

    @IsNotEmpty()
    @IsString()
    public description?: string
}

class CoordinatesDatas {
    @IsNotEmpty()
    @IsObject()
    latitude: number

    @IsNotEmpty()
    @IsObject()
    longitude: number

    @IsOptional()
    @IsString()
    public fullAddress: string | null
}

class CategoryDatas {
    @IsString()
    @IsNotEmpty()
    public name: string
}
