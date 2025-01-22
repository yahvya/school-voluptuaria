import { ApiResponseProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { RebuiltRegisteredPlaceDto } from "../../../utils/data-contracts/rebuilt-registered-place.dto"

/**
 * User wish list response data contract
 */
export class UserWishListGetResponseDto{
    @ApiResponseProperty()
    @Expose({name: "places_data"})
    public placesData: Array<RebuiltRegisteredPlaceDto>
}
