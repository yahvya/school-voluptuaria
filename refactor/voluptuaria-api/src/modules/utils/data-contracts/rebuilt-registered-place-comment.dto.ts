import { ApiResponseProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

/**
 * Rebuilt registered place comments data contract
 */
export class RebuiltRegisteredPlaceCommentDto{
    @ApiResponseProperty()
    public comment:string

    @ApiResponseProperty()
    @Expose({name: "posted_at"})
    public postedAt: Date

    @ApiResponseProperty()
    @Expose({name: "count_of_stars"})
    public countOfStars: number

    @ApiResponseProperty()
    @Expose({name:"by_user_name"})
    public byUserName: string

    @ApiResponseProperty()
    @Expose({name:"by_user_firstname"})
    public byUserFirstname: string
}
