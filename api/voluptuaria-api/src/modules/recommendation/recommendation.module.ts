import { Module } from "@nestjs/common"
import { SimpleTravelRouteService } from "./services/simple-travel-route.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TravelRoutesEntity } from "../database-module/entities/travel-routes.entity"
import { UserRecommendationCommentService } from "./services/user-recommendation-comment.service"
import { PlacesCommentsEntity } from "../database-module/entities/places-comments.entity"
import { PlacesEntity } from "../database-module/entities/places.entity"
import { UserEntity } from "../database-module/entities/user.entity"
import { CategoriesEntity } from "../database-module/entities/categories.entity"
import { LikedCategoriesEntity } from "../database-module/entities/liked-categories.entity"
import { UserRecommendationLikeService } from "./services/user-recommendation-like.service"
import { UnLikedCategoriesEntity } from "../database-module/entities/unliked-categories.entity"
import { SocialProfileEntity } from "../database-module/entities/social-profile.entity"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TravelRoutesEntity,
            PlacesCommentsEntity,
            PlacesEntity,
            UserEntity,
            SocialProfileEntity,
            CategoriesEntity,
            UnLikedCategoriesEntity,
            LikedCategoriesEntity

        ])
    ],
    providers: [SimpleTravelRouteService, UserRecommendationCommentService, UserRecommendationLikeService ],
    exports: [SimpleTravelRouteService, UserRecommendationCommentService, UserRecommendationLikeService],
})
export class RecommendationModule{}
