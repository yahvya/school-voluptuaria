import { UserRecommendationCommentService } from "../services/user-recommendation-comment.service"
import { Controller, Post, HttpCode, Query, Body } from "@nestjs/common"
import { UserCommentsData } from "../data-contracts/user-comments.data"
import { UserCommentsResponseDatas } from "../data-contracts/user-comments-response.datas"
import { UserRecommendationLikeService } from "../services/user-recommendation-like.service"
import { UserRecommendationLikeData } from "../data-contracts/user-recommendation-like.data"
import { UserRecommendationLikeResponseData } from "../data-contracts/user-recommendation-like-response.data"

/**
 * @brief controller of user comment for recommendation
 */
@Controller("Recommendation")
export class UserRecommendationCommentController {
    constructor(
        protected readonly userRecommendationCommentService: UserRecommendationCommentService,
        protected readonly userRecommendationLikeService: UserRecommendationLikeService
    ) {}

    /**
     * Handles a POST request to submit a user's recommendation comment.
     *
     * @param {UserCommentsData} userCommentDatas - The data object containing the user's comment and associated information.
     * @return {Promise<UserCommentsResponseDatas>} A promise resolving to the response data of the processed user comment.
     */
    @Post("/comment")
    @HttpCode(200)
    public userRecommendationComment(
        @Query() userCommentDatas : UserCommentsData
    ) :Promise<UserCommentsResponseDatas>{
        return this.userRecommendationCommentService.userRecommendationComment({
            userCommentsDatas : userCommentDatas
        })
    }

    /**
     * @param userRecommendationLikeData - The data of liking a place
     * @return {Promise<UserRecommendationLikeResponseData>} This promise of liking a post is a message and would be null in success case
     */
    @Post("/like")
    @HttpCode(200)
    public userRecommendationLike(
        @Query()  userRecommendationLikeData : UserRecommendationLikeData
    ) : Promise<UserRecommendationLikeResponseData> {
        return this.userRecommendationLikeService.userRecommendationLike({
            userRecommendationLikeData : userRecommendationLikeData
        })
    }
}
