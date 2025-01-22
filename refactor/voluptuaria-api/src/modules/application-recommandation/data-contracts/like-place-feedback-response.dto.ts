import { ApiResponseProperty } from "@nestjs/swagger"

/**
 * Like place feedback response data contract
 */
export class LikePlaceFeedbackResponseDto{
    @ApiResponseProperty()
    public error?: string = null
}
