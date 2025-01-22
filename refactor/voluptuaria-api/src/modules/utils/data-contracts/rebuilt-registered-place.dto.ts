import { ApiResponseProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

/**
 * Rebuilt registered place dto
 */
export class RebuiltRegisteredPlaceDto{
    @ApiResponseProperty()
    @Expose({name: "db_id"})
    public dbId:string

    @ApiResponseProperty()
    public data: Record<any, any>
}
