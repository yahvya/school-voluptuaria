import { Expose } from "class-transformer"
import { IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

/**
 * User google classic-registration start process request data contract
 */
export class UserGoogleRegistrationInitRequestDto{
    @ApiProperty({description: "Helper to build the user redirect uri",name:"redirect_uri"})
    @IsNotEmpty({message: "Bad request"})
    @Expose({ name: "redirect_uri" })
    public redirectUri: string
}
