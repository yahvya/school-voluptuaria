import { Expose } from "class-transformer"
import { UserGender } from "../../database/entities/user.entity"

/**
 * User account exportable data
 */
export class UserAccountDto{
    public id:string

    public email:string

    public birthdate?: Date = null

    @Expose({name: "name"})
    public userName: string

    @Expose({name: "firstname"})
    public userFirstname: string

    @Expose({name: "phone_number"})
    public phoneNumber?: string

    @Expose({name: "account_creation_date"})
    public accountCreationDate: Date

    @Expose({name: "gender"})
    public gender?: UserGender = null

    @Expose({name: "profile_picture_link"})
    public profilePictureLink ?:string = null

    public password: string
}
