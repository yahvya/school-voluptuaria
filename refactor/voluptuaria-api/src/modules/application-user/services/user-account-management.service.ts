import { Injectable } from "@nestjs/common"
import { UserProfileUpdateRequestDto } from "../data-contracts/user-account-management/user-profile-update-request.dto"
import { UserLoginResponseDto } from "../data-contracts/login/user-login-response.dto"
import { UserLoginService } from "./user-login.service"
import { UserAccountService } from "./user-account.service"
import { HashService } from "../../app-security/services/hash.service"
import { ConfigService } from "@nestjs/config"
import * as fs from "node:fs"
import { UserWishListUpdateRequestDto } from "../data-contracts/account-management/user-wish-list-update-request.dto"
import { UserWishListUpdateResponseDto } from "../data-contracts/account-management/user-wish-list-update-response.dto"
import { UserEntity } from "../../database/entities/user.entity"
import { Repository } from "typeorm"
import { RegisteredPlacesEntity } from "../../database/entities/registered-places.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { UserWishListGetResponseDto } from "../data-contracts/account-management/user-wish-list-get-response.dto"
import { PlaceRebuiltService } from "../../utils/services/place-rebuilt.service"
import { UserAccountDto } from "../data-contracts/account-management/user-account.dto"

/**
 * User account management service
 */
@Injectable()
export class UserAccountManagementService{
    constructor(
        private readonly userLoginService: UserLoginService,
        private readonly userAccountService: UserAccountService,
        private readonly hashService: HashService,
        private readonly configService: ConfigService,
        @InjectRepository(RegisteredPlacesEntity)
        private readonly registeredPlacesRepository: Repository<RegisteredPlacesEntity>,
        private readonly placeRebuiltService: PlaceRebuiltService
    ) {}

    /**
     * Get account data
     * @param authenticationToken authentication token
     * @return {Promise<UserAccountDto>} user account
     */
    public async getAccountData(
        {authenticationToken}:
        {authenticationToken:string}
    ):Promise<UserAccountDto>{
        const userEntity = await this.extractUserFromAuthenticationToken({authenticationToken: authenticationToken})

        const userAccountDto = new UserAccountDto()

        userAccountDto.email = userEntity.email
        userAccountDto.id = userEntity.id
        userAccountDto.userFirstname = userEntity.userFirstname
        userAccountDto.userName = userEntity.userName
        userAccountDto.phoneNumber = userEntity.phoneNumber
        userAccountDto.birthdate = userEntity.birthdate
        userAccountDto.accountCreationDate = userEntity.accountCreationDate
        userAccountDto.gender = userEntity.gender
        userAccountDto.profilePictureLink = this.buildProfilePictureLink({profilePicturePath: userEntity.profilePicturePath})

        return userAccountDto
    }

    /**
     * Build profile picture path
     * @param profilePicturePath path from db
     * @return {string} built path
     */
    public buildProfilePictureLink(
        {profilePicturePath}:
        {profilePicturePath:string}
    ):string{
        return `${this.configService.getOrThrow("API_WEBSITE_LINK")}/${this.configService.getOrThrow("API_PROFILE_PICTURES_SUB_LINK")}/${profilePicturePath}`
    }

    /**
     * Update user profile datas
     * @param requestDto request dto
     * @param authenticationToken authentication token
     */
    public async updateUserAccountProfileData(
        {requestDto,authenticationToken}:
        {requestDto: UserProfileUpdateRequestDto,authenticationToken: string}
    ):Promise<UserLoginResponseDto>{
        const response = new UserLoginResponseDto()

        try{
            // get the linked account
            const foundedUserEntity = await this.extractUserFromAuthenticationToken({authenticationToken: authenticationToken})

            if(foundedUserEntity === null){
                response.error = "error.unrecognized-email-password"
                return response
            }

            // update data
            if(requestDto.password !== null)
                foundedUserEntity.password = await this.hashService.hash({toHash: requestDto.password})

            if(requestDto.gender !== null)
                foundedUserEntity.gender = requestDto.gender

            if(requestDto.birthdate !== null && foundedUserEntity.birthdate === null)
                foundedUserEntity.birthdate = requestDto.birthdate

            if(requestDto.phoneNumber !== null)
                foundedUserEntity.phoneNumber = requestDto.phoneNumber

            if(requestDto.profilePictureImage !== null){
                // check image type
                if(!requestDto.profilePictureImage.mimetype.match(/^image.*/)){
                    response.error = "error.bad-fields"
                    return response
                }

                const profilePicturesDirectory = this.configService.getOrThrow("STORAGE_USERS_PROFILE_PICTURES")

                // remove the current profile picture
                if(foundedUserEntity.profilePicturePath !== null)
                    fs.rmSync(`${profilePicturesDirectory}/${foundedUserEntity.profilePicturePath}`)

                let generatedName: string
                const imageExtension = `.${requestDto.profilePictureImage.originalname.split(/\./)[1]}`

                do
                  generatedName = `${Date.now()}${imageExtension}`
                while(fs.existsSync(`${profilePicturesDirectory}/${generatedName}`))

                // saving image
                const imageFullPath = `${profilePicturesDirectory}/${generatedName}`

                fs.writeFileSync(imageFullPath,requestDto.profilePictureImage.buffer)

                foundedUserEntity.profilePicturePath = generatedName
            }

            const updateResult = await this.userAccountService.updateUserFromEntity({userEntity: foundedUserEntity})

            if(updateResult === false){
                response.error = "error.technical"
                return response
            }

            response.authenticationToken = this.userLoginService.buildTokenFromUserEntity({userEntity: foundedUserEntity})
        }
        catch (_){
            console.log(_)
            response.error = "error.technical"
        }

        return response
    }

    /**
     * Update user wish list
     * @param requestDto request dto
     * @param authenticationToken authentication token
     * @return {Promise<UserWishListUpdateResponseDto>} response success
     */
    public async updateUserWishList(
        {requestDto,authenticationToken}:
        {requestDto:UserWishListUpdateRequestDto,authenticationToken:string}
    ):Promise<UserWishListUpdateResponseDto>{
        const response = new UserWishListUpdateResponseDto()

        try{
            // get the linked account
            const foundedUserEntity = await this.extractUserFromAuthenticationToken({authenticationToken: authenticationToken})

            if(foundedUserEntity === null){
                response.error = "error.unrecognized-email-password"
                return response
            }

            // update user wishlist
            if(foundedUserEntity.wishList === undefined)
                foundedUserEntity.wishList = []

            // remove elements
            foundedUserEntity.wishList = foundedUserEntity.wishList.filter(registeredPlace => requestDto.placesId.includes(registeredPlace.id))

            // add new elements
            const wishListPlaceIds = foundedUserEntity.wishList.map(registeredPlace => registeredPlace.id)
            for(const placeId of requestDto.placesId){
                if(!wishListPlaceIds.includes(placeId))
                    foundedUserEntity.wishList.push(await this.registeredPlacesRepository.findOneBy({id: placeId}))
            }

            if(await this.userAccountService.updateUserFromEntity({userEntity: foundedUserEntity}) === false)
                response.error = "error.technical"
        }
        catch (_){
            console.log(_)
            response.error = "error.technical"
        }

        return response
    }

    /**
     * Provide user wish list
     * @param authenticationToken authentication token
     * @return {Promise<UserWishListGetResponseDto>} response
     */
    public async getWishList(
        {authenticationToken}:
        {authenticationToken:string}
    ):Promise<UserWishListGetResponseDto>{
        const response  = new UserWishListGetResponseDto()
        response.placesData = []

        try{
            // get user
            const userEntity = await this.extractUserFromAuthenticationToken({authenticationToken: authenticationToken})

            if(userEntity === null)
                return response

            // transform wish list to elements
            if(userEntity.wishList === undefined)
                userEntity.wishList = []

            for(const placeData of userEntity.wishList){
                const rebuiltResult = await this.placeRebuiltService.fromRegisteredToData({registeredPlaceEntity: placeData})

                if(rebuiltResult !== null)
                    response.placesData.push(rebuiltResult)
            }
        }
        catch (_){}

        return response
    }

    /**
     * Extract user data from authentication token
     * @param authenticationToken authentication token
     * @return {Promise<UserEntity|null>} user or null on not found
     */
    private async extractUserFromAuthenticationToken(
        {authenticationToken}:
        {authenticationToken:string}
    ):Promise<UserEntity|null>{
        try{
            const userData = this.userLoginService.verifyToken({token: authenticationToken})

            if(userData === null)
                return null

            return await this.userAccountService.findUserFromEmail({email: userData.email})
        }
        catch (_){
            return null
        }
    }
}
