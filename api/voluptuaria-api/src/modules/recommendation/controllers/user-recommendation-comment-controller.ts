import { UserRecommendationCommentService } from "../services/user-recommendation-comment.service"
import { Controller, Post, HttpCode, Query } from "@nestjs/common"
import { UserCommentsData } from "../data-contracts/user-comments.data"
import { UserCommentsResponseDatas } from "../data-contracts/user-comments-response.datas"

/**
 * @brief controller of user comment for recommendation
 */
@Controller("Recommendation")
export class UserRecommendationCommentController {
    constructor(
        protected readonly userRecommendationCommentService: UserRecommendationCommentService
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
}
