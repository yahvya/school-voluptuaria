import { ApiResponseProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

/**
 * Google Maps place coordinate data contract
 */
export class GoogleMapsPlaceCoordinateDto{
    @ApiResponseProperty()
    public latitude: string

    @ApiResponseProperty()
    public longitude: string

    @ApiResponseProperty()
    @Expose({name: "full_address"})
    public fullAddress?: string
}
