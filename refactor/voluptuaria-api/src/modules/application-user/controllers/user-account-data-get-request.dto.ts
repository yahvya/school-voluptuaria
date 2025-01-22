import { UserGender } from "../../database/entities/user.entity"
import { ApiResponseProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

/**
 * User account full data
 */
export class UserAccountDataGetRequestDto{
    @ApiResponseProperty()
    public id:string

    @ApiResponseProperty()
    public email: string

    @ApiResponseProperty()
    public birthdate?: Date = null

    @ApiResponseProperty()
    @Expose({name: "user_name"})
    public userName: string

    @ApiResponseProperty()
    @Expose({name: "user_firstname"})
    public userFirstname: string

    @ApiResponseProperty()
    @Expose({name: "phone_number"})
    public phoneNumber?: string = null

    @ApiResponseProperty()
    @Expose({name: "account_creation_date"})
    public accountCreationDate: Date

    @ApiResponseProperty()
    public gender?: UserGender = null

    @ApiResponseProperty()
    @Expose({name: "profile_picture_link"})
    public profilePictureLink?:string = null
}
