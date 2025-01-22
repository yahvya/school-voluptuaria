import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

/**
 * Like place feedback request data contract
 */
export class LikePlaceFeedbackRequestDto{
    @ApiProperty({name: "category_name"})
    @Expose({name: "category_name"})
    public categoryName: string

    @ApiProperty()
    public like: boolean
}
