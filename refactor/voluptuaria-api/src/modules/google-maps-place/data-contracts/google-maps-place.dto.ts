import { Injectable } from "@nestjs/common"
import { GoogleMapsPlaceOpeningHoursDto } from "./google-maps-place-opening-hours.dto"
import { GoogleMapsPlaceAccessibilityDto } from "./google-maps-place-accessibility.dto"
import { GoogleMapsPlaceReviewDto } from "./google-maps-place-review.dto"
import { GoogleMapsPlaceCategoriesDto } from "./google-maps-place-categories.dto"
import { GoogleMapsPlaceCoordinateDto } from "./google-maps-place-coordinate.dto"
import { GoogleMapsPlaceImageDto } from "./google-maps-place-image.dto"
import { GoogleMapsPlacePricesDto } from "./google-maps-place-prices.dto"
import { ApiResponseProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

/**
 * Google Maps place api data contract
 */
@Injectable()
export class GoogleMapsPlaceDto{
    @ApiResponseProperty()
    public accessId?: string

    @ApiResponseProperty()
    public prices: GoogleMapsPlacePricesDto

    @ApiResponseProperty()
    @Expose({name: "place_name"})
    public placeName: string

    @ApiResponseProperty()
    @Expose({name: "phone_number"})
    public phoneNumber?: string

    @ApiResponseProperty()
    @Expose({name: "is_opened_now"})
    public isOpenedNow: boolean

    @ApiResponseProperty()
    @Expose({name: "open_on_google_maps_uri"})
    public openOnGoogleMapsUri: string

    @ApiResponseProperty()
    @Expose({name: "for_kids"})
    public forKids?: boolean

    @ApiResponseProperty()
    public rating: number

    @ApiResponseProperty()
    public images: GoogleMapsPlaceImageDto[]

    @ApiResponseProperty()
    public coordinate: GoogleMapsPlaceCoordinateDto

    @ApiResponseProperty()
    public categories: GoogleMapsPlaceCategoriesDto[]

    @ApiResponseProperty()
    public comments: GoogleMapsPlaceReviewDto[]

    @ApiResponseProperty()
    public accessibility?: GoogleMapsPlaceAccessibilityDto

    @ApiResponseProperty()
    @Expose({name: "opening_hours"})
    public openingHours: GoogleMapsPlaceOpeningHoursDto[]
}
