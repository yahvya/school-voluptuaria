import { Expose } from "class-transformer"
import { UserGender } from "../../../database/entities/user.entity"
import { ApiResponseProperty } from "@nestjs/swagger"

/**
 * User account exportable data
 */
export class UserAccountDto{
    @ApiResponseProperty()
    public id:string

    @ApiResponseProperty()
    public email:string

    @ApiResponseProperty()
    public birthdate?: Date = null

    @ApiResponseProperty()
    @Expose({name: "name"})
    public userName: string

    @ApiResponseProperty()
    @Expose({name: "firstname"})
    public userFirstname: string

    @ApiResponseProperty()
    @Expose({name: "phone_number"})
    public phoneNumber?: string

    @ApiResponseProperty()
    @Expose({name: "account_creation_date"})
    public accountCreationDate: Date

    @ApiResponseProperty()
    @Expose({name: "gender"})
    public gender?: UserGender = null

    @ApiResponseProperty()
    @Expose({name: "profile_picture_link"})
    public profilePictureLink ?:string = null

    @ApiResponseProperty()
    public password: string
}
