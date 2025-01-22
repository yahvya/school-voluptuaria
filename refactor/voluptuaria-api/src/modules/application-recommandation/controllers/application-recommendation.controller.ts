import { Body, Controller, Get, HttpCode, UseGuards, Headers, Post } from "@nestjs/common"
import { VoluptuariaAuthGuard } from "../../../commons/guards/voluptuaria-auth.guard"
import { ApplicationAuthenticationGuard } from "../../../commons/guards/application-authentication.guard"
import { ApiHeader, ApiResponse } from "@nestjs/swagger"
import { UserPlaceSearchRequestDto } from "../data-contracts/user-place-search-request.dto"
import { GoogleMapsPlaceDto } from "../../google-maps-place/data-contracts/google-maps-place.dto"
import { ApplicationRecommendationService } from "../services/application-recommendation.service"
import { PostCommentResponseDto } from "../data-contracts/post-comment-response.dto"
import { PostCommentRequestDto } from "../data-contracts/post-comment-request.dto"

/**
 * Application recommandation controller
 */
@Controller("recommandation")
@UseGuards(VoluptuariaAuthGuard,ApplicationAuthenticationGuard)
@ApiHeader({name: "voluptuaria_token",description: "Voluptuaria token"})
@ApiHeader({name: "voluptuaria_token_iv",description: "Voluptuaria token iv"})
export class ApplicationRecommendationController{
    constructor(
        private applicationRecommandationService: ApplicationRecommendationService
    ) {}

    /**
     * User search from text
     * @param requestDto request dto
     * @param lang lang
     */
    @Get("/search/text")
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        type: Array<GoogleMapsPlaceDto>
    })
    public textSearch(@Body() requestDto: UserPlaceSearchRequestDto,@Headers("lang") lang:string):Promise<GoogleMapsPlaceDto[]>{
        return this.applicationRecommandationService.searchPlaces({requestDto: requestDto,lang: lang})
    }

    @Get("/recommandations/first")
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        type: Array<GoogleMapsPlaceDto[]>
    })
    public firstRecommandations(@Headers("lang") lang:string):Promise<GoogleMapsPlaceDto[]>{
        return this.applicationRecommandationService.provideFirstRecommandations({lang: lang})
    }

    /**
     *
     */
    @Post("/comment/post")
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        type: PostCommentResponseDto
    })
    @UseGuards(ApplicationAuthenticationGuard)
    @ApiHeader({name: "authentication_token",description: "Authentication token"})
    public postComment(@Body() requestDto: PostCommentRequestDto,@Headers("authentication_token") authenticationToken: string):Promise<PostCommentResponseDto>{
        return this.applicationRecommandationService.postComment({requestDto: requestDto,authenticationToken: authenticationToken})
    }
}
