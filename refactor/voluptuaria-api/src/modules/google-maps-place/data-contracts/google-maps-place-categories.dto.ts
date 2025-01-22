import { ApiResponseProperty } from "@nestjs/swagger"

/**
 * Google Maps place categories dto
 */
export class GoogleMapsPlaceCategoriesDto{
    @ApiResponseProperty()
    public name: string
}
