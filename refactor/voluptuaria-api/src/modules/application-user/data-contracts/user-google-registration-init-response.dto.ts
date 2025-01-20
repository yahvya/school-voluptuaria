import { ApiResponseProperty } from "@nestjs/swagger"

/**
 * User google registration start process response data contract
 */
export class UserGoogleRegistrationInitResponseDto{
    @ApiResponseProperty()
    public error?: string = null

    @ApiResponseProperty()
    public link?: string = null
}
