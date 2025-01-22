import { ApiProperty } from "@nestjs/swagger"

/**
 * User wish list update response data contract
 */
export class UserWishListUpdateResponseDto {
    @ApiProperty()
    public error?: string = null
}
