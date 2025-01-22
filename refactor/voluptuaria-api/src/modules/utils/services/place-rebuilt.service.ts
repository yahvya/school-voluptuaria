import { forwardRef, Inject, Injectable } from "@nestjs/common"
import { RegisteredPlacesEntity } from "../../database/entities/registered-places.entity"
import { RebuiltRegisteredPlaceDto } from "../data-contracts/rebuilt-registered-place.dto"
import { IdSource } from "../../../configs/interfaces/id-getter.config"
import { GoogleMapsPlaceLoadableService } from "../../google-maps-place/utils/google-maps-place-loadable.service"
import { RebuiltRegisteredPlaceCommentDto } from "../data-contracts/rebuilt-registered-place-comment.dto"
import { ConfigService } from "@nestjs/config"

/**
 * Place rebuild service
 */
@Injectable()
export class PlaceRebuiltService {
    constructor(
        private readonly googleMapsPlaceLoadableService : GoogleMapsPlaceLoadableService,
        private readonly configService: ConfigService,
    ) {}

    /**
     * Rebuilt from db data
     * @param registeredPlaceEntity entity
     * @return {Promise<RebuiltRegisteredPlaceDto|null>} result
     */
    public async fromRegisteredToData(
        {registeredPlaceEntity}:
        {registeredPlaceEntity:RegisteredPlacesEntity}
    ):Promise<RebuiltRegisteredPlaceDto|null>{
        try{
            // check from which element it comes from
            switch(registeredPlaceEntity.idGetter.source){
                case IdSource.GOOGLE_MAPS:
                    // rebuilt google maps
                    const loadedPlaceData = await this.googleMapsPlaceLoadableService.loadFrom({locationGetter: registeredPlaceEntity.locationConfig})

                    if(loadedPlaceData === null)
                        return null

                    return this.buildResultFrom({loadedPlaceData: loadedPlaceData,registeredPlaceEntity: registeredPlaceEntity})
                default:
                    return null;
            }
        }
        catch (_){
            return null
        }
    }

    /**
     * Build rebuilt result
     * @param loadedPlaceData loaded place data
     * @param registeredPlaceEntity from entity
     * @return {RebuiltRegisteredPlaceDto} result
     */
    private buildResultFrom(
        {loadedPlaceData,registeredPlaceEntity}:
        {loadedPlaceData:Record<any, any>,registeredPlaceEntity:RegisteredPlacesEntity}
    ):RebuiltRegisteredPlaceDto{
        const result = new RebuiltRegisteredPlaceDto()

        result.dbId = registeredPlaceEntity.id
        result.data = loadedPlaceData
        result.websiteComments = registeredPlaceEntity.comments.map((comment) => {
            const placeRebuiltComment = new RebuiltRegisteredPlaceCommentDto()

            placeRebuiltComment.byUserName = comment.byUser.userName
            placeRebuiltComment.byUserFirstname = comment.byUser.userFirstname
            placeRebuiltComment.comment = comment.comment
            placeRebuiltComment.countOfStars = comment.countOfStars

            if(comment.byUser.profilePicturePath !== null)
                placeRebuiltComment.userProfilePictureLink = this.buildProfilePictureLink({profilePicturePath: comment.byUser.profilePicturePath})

            return placeRebuiltComment
        })

        return result
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
}
