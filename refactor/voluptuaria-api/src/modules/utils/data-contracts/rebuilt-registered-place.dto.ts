import { ApiEarlyhintsResponse, ApiResponseProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { RebuiltRegisteredPlaceCommentDto } from "./rebuilt-registered-place-comment.dto"

/**
 * Rebuilt registered place dto
 */
export class RebuiltRegisteredPlaceDto{
    @ApiResponseProperty()
    @Expose({name: "db_id"})
    public dbId:string

    @ApiResponseProperty()
    public data: Record<any, any>

    @ApiEarlyhintsResponse()
    @Expose({name: "website_comments"})
    public websiteComments: RebuiltRegisteredPlaceCommentDto[]
}
