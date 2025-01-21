import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { UserGender } from "../../../database/entities/user.entity"
import { IsStrongPassword } from "class-validator"

/**
 * User profile update request data contract
 */
export class UserProfileUpdateRequestDto{
    @ApiProperty({description: "New password"})
    @IsStrongPassword({
        minLength: 8,
        minSymbols: 1,
        minUppercase: 1
    })
    public password ?:string = null

    @ApiProperty({description: "Birthdate, can only be update one time"})
    public birthdate ?: Date = null

    @ApiProperty({name: "phone_number",description:"Phone number"})
    @Expose({name:"phone_number"})
    public phoneNumber ?:string = null

    @ApiProperty({description:"User gender",enum: UserGender})
    public gender?: UserGender = null

    @ApiProperty({name: "profile_picture_image",description:"User new profile picture image"})
    @Expose({name: "profile_picture_image"})
    public profilePictureImage?: Express.Multer.File = null
}
