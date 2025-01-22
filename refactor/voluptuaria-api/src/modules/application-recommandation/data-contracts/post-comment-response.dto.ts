import { ApiResponseProperty } from "@nestjs/swagger"

/**
 * Post comment response data contract
 */
export class PostCommentResponseDto{
    @ApiResponseProperty()
    public error?:string = null
}
