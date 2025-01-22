import { ApiResponseProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

/**
 * Google Maps place accessibility data contract
 */
export class GoogleMapsPlaceAccessibilityDto{
    @ApiResponseProperty()
    @Expose({name: "can_access_parking"})
    public canAccessParking?: boolean

    @ApiResponseProperty()
    @Expose({name: "can_access_entrance"})
    public canAccessEntrance?: boolean

    @ApiResponseProperty()
    @Expose({name: "can_access_rest_place"})
    public canAccessRestPlace?: boolean
}
