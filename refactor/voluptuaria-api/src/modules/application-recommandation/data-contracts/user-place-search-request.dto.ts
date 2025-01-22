import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

/**
 * User place search request dto
 */
export class UserPlaceSearchRequestDto {
    @ApiProperty()
    public search: string

    @ApiProperty({name: "min_rating"})
    @Expose({name: "min_rating"})
    public minRating: number
}
