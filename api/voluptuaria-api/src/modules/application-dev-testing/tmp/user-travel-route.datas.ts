/**
 * @brief User travel information.
 */
import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Expose } from "class-transformer"

export class UserTravelRoute {
    @IsNotEmpty()
    @IsString()
    @Expose({ name: "start date" })
    /**
     * @brief the start date given by user for travel
     */
    public startDate: string

    @IsNotEmpty()
    @IsString()
    @Expose({ name: "end date" })
    /**
     * @brief the end date given by user for travel
     */
    public endDate: string

    @IsNotEmpty()
    @IsString()
    @Expose({ name: "zone" })
    /**
     * @brief the given user zone for travel
     */
    public zone: string

    @IsNotEmpty()
    @IsNumber()
    public budget: number
}

export class UserTravelRouteHeaders {
    @IsString()
    @IsNotEmpty()
    "voluptaria-token": string

    @IsString()
    @IsNotEmpty()
    "authentication-token": string
}
