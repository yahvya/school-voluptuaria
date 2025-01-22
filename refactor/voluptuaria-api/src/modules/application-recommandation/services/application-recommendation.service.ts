import { Injectable } from "@nestjs/common"
import { UserPlaceSearchRequestDto } from "../data-contracts/user-place-search-request.dto"
import { GoogleMapsPlaceService } from "../../google-maps-place/services/google-maps-place.service"
import { GoogleMapsPlaceDto } from "../../google-maps-place/data-contracts/google-maps-place.dto"

/**
 * Application recommandation service
 */
@Injectable()
export class ApplicationRecommendationService{
    constructor(
        private readonly googleMapsPlaceService:GoogleMapsPlaceService
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
}
