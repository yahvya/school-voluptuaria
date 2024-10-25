import { Injectable } from "@nestjs/common"
import { UserProfileImageResponseDatas } from "../data-contracts/user-informations/user-profile-image-response.datas"
import { UserProfileImageDatas } from "../data-contracts/user-informations/user-profile-image.datas"
import { EditPasswordDatas } from "../data-contracts/user-informations/edit-password.datas"
import { EditPasswordResponse } from "../data-contracts/user-informations/edit-password-response"
import { UserLoginService } from "./user-login.service"
import { InjectRepository } from "@nestjs/typeorm"
import { UserEntity } from "../../database-module/entities/user.entity"
import { Repository } from "typeorm"
import { HashService } from "../../app-security/services/hash.service"
import { ConfigService } from "@nestjs/config"
import * as fs from "node:fs"
import { UserProfileResponseDatas } from "../data-contracts/user-informations/user-profile-response.datas"
import { UserProfileDatas } from "../data-contracts/user-informations/user-profile.datas"

/**
 * @brief user information management service
 */
@Injectable()
export class UserInformationsService {

    constructor(
        @InjectRepository(UserEntity)
        protected readonly userRepository: Repository<UserEntity>,
        protected readonly userLoginService: UserLoginService,
        protected readonly hashService: HashService,
        protected readonly configService: ConfigService
    ) {
    }
    /**
     * @brief update the user profile image
     * @param options options
     * @returns {Promise<UserProfileImageResponseDatas>} upload response
     */
    public async updateUserProfileImage(options: {
        image: Express.Multer.File
        profileImageDatas: UserProfileImageDatas
    }): Promise<UserProfileImageResponseDatas> {
        const result = new UserProfileImageResponseDatas()

        try{
            const {image,profileImageDatas} = options

            // check image type

            if(!image.mimetype.match(/^image.*/)){
                result.errorMessage = "error.bad-fields"
                return result
            }

            const payload = await this.userLoginService.validateToken(profileImageDatas.authentication_token)

            if(payload === null){
                result.errorMessage = "error.unrecognized-email-password"
                return result
            }

            const user = await this.userRepository.findOneBy({
                email: payload.email,
            })

            if(user === null){
                result.errorMessage = "error.unrecognized-email-password"
                return result
            }

            const profilePicturesDirectory = this.configService.getOrThrow("USERS_PROFILE_PICTURES")

            // remove the current profile picture
            if(user.profilePictureLink !== null){
                const currentProfilePicturePath = `${profilePicturesDirectory}/${user.profilePictureLink}`

                fs.rmSync(currentProfilePicturePath)
            }

            // generate free name
            let generatedName: string
            const imageExtension = `.${image.originalname.split(/\./)[1]}`

            do
              generatedName = `${Date.now()}${imageExtension}`
            while(fs.existsSync(`${profilePicturesDirectory}/${generatedName}`))

            // saving image
            const imageFullPath = `${profilePicturesDirectory}/${generatedName}`

            fs.writeFileSync(imageFullPath,image.buffer)

            // update path in database
            user.profilePictureLink = generatedName

            await this.userRepository.save(user)

            result.imageUrl = `${this.configService.getOrThrow("APPLICATION_LINK")}/${this.configService.getOrThrow("USERS_PROFILE_PICTURES_FOR_LINK")}/${generatedName}`
        }
        catch(_){
            result.errorMessage = "error.technical"
        }

        return result
    }

    /**
     * @brief try to edit user password
     * @param options options
     * @returns {EditPasswordResponse} edit response
     */

    public async editPassword(options: {
        editPasswordData: EditPasswordDatas
    }): Promise<EditPasswordResponse> {
        const {
            new_password,
            confirm_new_password,
            old_password,
            authentication_token,
        } = options.editPasswordData

        const payload  = await this.userLoginService.validateToken(authentication_token)

        const user = await this.userRepository.findOneBy({
            email: payload.email,
        })
        const response = new EditPasswordResponse()

        // User not exist case
        if (!user) {
            response.errorMessage = "error.invalid-token"
            return response
        }

        //Verify if the old password matches the user's current password
        const oldPasswordMatch = await this.hashService.compare({
            toCompare: old_password,
            hash: user.password,
        })

        if (!oldPasswordMatch) {
            response.errorMessage = "error.same-password"
            return response
        }

        // Check if new password and confirm password not match
        if (new_password !== confirm_new_password) {
            response.errorMessage = "error.matching-password"
            return response
        }

        try {
            await this.userRepository.save({
                user: user,
                password: await this.hashService.hash({
                    toHash: new_password,
                    salt: 10,
                }),
            })
        } catch (_) {
            response.errorMessage = "error.technical"
        }

        return response
    }

    /**
     * @brief update user profile datas
     * @param options options
     * @returns {Promise<UserProfileResponseDatas>} response
     */
    public async updateUserProfile(options: {userProfileDatas: UserProfileDatas}):Promise<UserProfileResponseDatas>{
        const {authentication_token,firstname,name,phonenumber,birthday} = options.userProfileDatas
        const result = new UserProfileResponseDatas()

        try{
            // find user
            const payload = await this.userLoginService.validateToken(authentication_token)

            if(payload === null){
                result.errorMessage = "error.unrecognized-email-password"
                return result
            }

            const user = await this.userRepository.findOneBy({
                email: payload.email
            })

            if(user === undefined){
                result.errorMessage = "error.unrecognized-email-password"
                return result
            }

            // updating datas
            if(firstname !== undefined)
                user.firstName = firstname

            if(name !== undefined)
                user.name = name

            if(phonenumber !== undefined)
                user.phonenumber = phonenumber

            if(birthday !== undefined){
                if(isNaN(Date.parse(birthday))){
                    result.errorMessage = "error.bad-fields"
                    return result
                }

                // check if the birthday where already defined
                if(user.birthdate !== null){
                    result.errorMessage = "error.bad-fields"
                    return result
                }

                user.birthdate = new Date(birthday)
            }

            await this.userRepository.save(user)

            result.authenticationToken = this.userLoginService.generateToken({
                email: user.email
            })
        }
        catch(_){
            result.errorMessage = "error.technical"
        }

        return result
    }
}
