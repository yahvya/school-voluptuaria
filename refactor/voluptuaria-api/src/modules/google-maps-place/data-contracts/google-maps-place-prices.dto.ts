import { ApiResponseProperty } from "@nestjs/swagger"

/**
 * Google maps place prices data contract
 */
export class GoogleMapsPlacePricesDto{
    @ApiResponseProperty()
    public price: number

    @ApiResponseProperty()
    public currency: string
}
