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
        private readonly registeredPlacesEntityRepository: Repository<RegisteredPlacesEntity>
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
}
