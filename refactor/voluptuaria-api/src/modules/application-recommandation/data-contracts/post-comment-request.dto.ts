import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

/**
 * Post comment request data contract
 */
export class PostCommentRequestDto{
    @ApiProperty({name: "registered_place_id"})
    @Expose({name: "registered_place_id"})
    public registeredPlaceId: string

    @ApiProperty()
    public comment:string

    @ApiProperty({name: "count_of_stars"})
    @Expose({name: "count_of_stars"})
    public countOfStars: number
}
