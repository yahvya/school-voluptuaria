import { Expose } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

/**
 * User wish list update request data contract
 */
export class UserWishListUpdateRequestDto {
    @Expose({name: "places_id"})
    @ApiProperty({description: "Places id",name: "places_id"})
    public placesId: string[]
}
