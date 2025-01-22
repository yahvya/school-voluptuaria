import { Injectable } from "@nestjs/common"
import { UserPlaceSearchRequestDto } from "../data-contracts/user-place-search-request.dto"
import { GoogleMapsPlaceService } from "../../google-maps-place/services/google-maps-place.service"
import { GoogleMapsPlaceDto } from "../../google-maps-place/data-contracts/google-maps-place.dto"
import { PostCommentRequestDto } from "../data-contracts/post-comment-request.dto"
import { PostCommentResponseDto } from "../data-contracts/post-comment-response.dto"
import { UserAccountManagementService } from "../../application-user/services/user-account-management.service"
import { UserCommentsEntity } from "../../database/entities/user-comments.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { RegisteredPlacesEntity } from "../../database/entities/registered-places.entity"
import { LikePlaceFeedbackRequestDto } from "../data-contracts/like-place-feedback-request.dto"
import { LikePlaceFeedbackResponseDto } from "../data-contracts/like-place-feedback-response.dto"
import { SocialProfileEntity } from "../../database/entities/social-profile.entity"
import { UserEntity } from "../../database/entities/user.entity"
import { PlaceCategoriesEntity } from "../../database/entities/place-categories.entity"
import { UserCategoriesLikeStateEntity } from "../../database/entities/user-categories-like-state.entity"

/**
 * Application recommandation service
 */
@Injectable()
export class ApplicationRecommendationService{
    constructor(
        private readonly googleMapsPlaceService:GoogleMapsPlaceService,
        private readonly userAccountManagementService: UserAccountManagementService,
        @InjectRepository(UserCommentsEntity)
        private readonly commentsRepository: Repository<UserCommentsEntity>,
        @InjectRepository(RegisteredPlacesEntity)
        private readonly registeredPlacesEntityRepository: Repository<RegisteredPlacesEntity>,
        @InjectRepository(SocialProfileEntity)
        private readonly socialProfileRepository: Repository<SocialProfileEntity>,
        @InjectRepository(PlaceCategoriesEntity)
        private readonly placeCategoryRepository: Repository<PlaceCategoriesEntity>,
        @InjectRepository(UserCategoriesLikeStateEntity)
        private readonly userCategoriesLikeStateRepository: Repository<UserCategoriesLikeStateEntity>
    ) {}

    /**
     * Search place from text
     * @param requestDto request
     * @param lang lang
     * @return {Promise<GoogleMapsPlaceDto[]>} response
     */
    public async searchPlaces(
        {requestDto,lang}:
        {requestDto:UserPlaceSearchRequestDto,lang:string}
    ):Promise<GoogleMapsPlaceDto[]>{
        try{
            return await this.googleMapsPlaceService.loadUserTextSearch({search:requestDto.search,lang: lang,minRating: requestDto.minRating})
        }
        catch (_){
            return []
        }
    }

    /**
     * Provide first recommandations
     */
    public async provideFirstRecommandations(
        {lang}:
        {lang:string}
    ):Promise<GoogleMapsPlaceDto[]>{
        try{
            return await this.googleMapsPlaceService.loadByCategories({categories: GoogleMapsPlaceService.TYPES_LIST,lang: lang,minRating: 3})
        }
        catch (_){
            return []
        }
    }

    /**
     * Post comment on a place
     * @param requestDto request dto
     * @param authenticationToken authentication token
     * @return {Promise<PostCommentResponseDto>}
     */
    public async postComment(
        {requestDto,authenticationToken}:
        {requestDto:PostCommentRequestDto,authenticationToken:string}
    ):Promise<PostCommentResponseDto>{
        const response = new PostCommentResponseDto()

        try{
            const userEntity = await this.userAccountManagementService.extractUserFromAuthenticationToken({authenticationToken: authenticationToken})
            const registeredPlace = await this.registeredPlacesEntityRepository.findOneBy({id: requestDto.registeredPlaceId})

            if(registeredPlace === null){
                response.error = "error.bad-fields"
                return response
            }

            const newComment = new UserCommentsEntity()

            newComment.comment = requestDto.comment
            newComment.countOfStars = requestDto.countOfStars
            newComment.byUser = userEntity
            newComment.forPlace = registeredPlace

            await this.commentsRepository.save(newComment)
        }
        catch (_){
            response.error = "error.technical"
        }

        return response
    }

    /**
     * Register like state
     * @param requestDto request data contract
     * @param authenticationToken authentication token
     * @return {Promise<LikePlaceFeedbackResponseDto>} response
     */
    public async registerLikeStateOnCategory(
        {requestDto,authenticationToken}:
        {requestDto:LikePlaceFeedbackRequestDto,authenticationToken:string}
    ):Promise<LikePlaceFeedbackResponseDto>{
        const response = new LikePlaceFeedbackResponseDto()

        try{
            const userEntity = await this.userAccountManagementService.extractUserFromAuthenticationToken({authenticationToken: authenticationToken})

            if(userEntity === null){
                response.error = "error.technical"
                return response
            }

            const socialProfile = await this.loadUserLastSocialProfile({userEntity: userEntity})

            // check category existence
            const categoryEntity = await this.placeCategoryRepository.findOneBy({categoryName: requestDto.categoryName})

            if(categoryEntity === null){
                response.error = "error.bad-fields"
                return response
            }


            let likeState = await this.userCategoriesLikeStateRepository
                .createQueryBuilder()
                .where("socialProfileId = :socialProfileId and categoryId = :categoryId",{socialProfileId: socialProfile.id,categoryId: categoryEntity.id})
                .getOne()

            if(likeState === null){
                likeState = new UserCategoriesLikeStateEntity()
                likeState.category = categoryEntity
                likeState.countState = requestDto.like ? 1 : -1
                likeState.socialProfile = socialProfile
            }
            else
                likeState.countState = requestDto.like ? likeState.countState + 1 : likeState.countState - 1

            await this.userCategoriesLikeStateRepository.save(likeState)
        }
        catch (_){
            response.error = "error.technical"
        }

        return response
    }

    /**
     * Load user last social profile
     * @param userEntity user entity
     * @return {Promise<SocialProfileEntity>} last social profile
     */
    public async loadUserLastSocialProfile(
        {userEntity}:
        {userEntity:UserEntity}
    ):Promise<SocialProfileEntity>{
        // load user last social profile or create it if not exist
        let socialProfile:SocialProfileEntity

        if(userEntity.userSocialProfiles === undefined || userEntity.userSocialProfiles.length === 0){
            socialProfile = new SocialProfileEntity()

            socialProfile.user = userEntity
            socialProfile = await this.socialProfileRepository.save(socialProfile)
        }
        else
            socialProfile = userEntity.userSocialProfiles[0]

        return socialProfile
    }
}
