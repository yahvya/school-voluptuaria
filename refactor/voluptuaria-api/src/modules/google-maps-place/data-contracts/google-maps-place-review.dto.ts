import { ApiResponseProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

/**
 * Google Maps google review for place
 */
export class GoogleMapsPlaceReviewDto{
    @ApiResponseProperty()
    public comment: string

    @ApiResponseProperty()
    public rating: number

    @ApiResponseProperty()
    @Expose({name: "wrote_at"})
    public wroteAt: string
}
