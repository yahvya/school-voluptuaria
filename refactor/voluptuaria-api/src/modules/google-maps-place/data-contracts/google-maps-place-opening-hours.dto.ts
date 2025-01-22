import { ApiResponseProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

/**
 * Google Maps place api opening hour data contract
 */
export class GoogleMapsPlaceOpeningHoursDto{
    @ApiResponseProperty()
    public day: string

    @ApiResponseProperty()
    @Expose({name: "open_time"})
    public openTime: string|null

    @Expose({name: "close_time"})
    public closeTime: string|null
}
