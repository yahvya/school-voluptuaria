import { ApiResponseProperty } from "@nestjs/swagger"

/**
 * Google Maps place image data contract
 */
export class GoogleMapsPlaceImageDto{
    @ApiResponseProperty()
    public url: string

    @ApiResponseProperty()
    public description: string
}
