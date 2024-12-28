import { Module } from "@nestjs/common"
import { SimpleTravelRouteService } from "./services/simple-travel-route.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TravelRoutesEntity } from "../database-module/entities/travel-routes.entity"
import { UserRecommendationCommentService } from "./services/user-recommendation-comment.service"
import { PlacesCommentsEntity } from "../database-module/entities/places-comments.entity"
import { PlacesEntity } from "../database-module/entities/places.entity"
import { UserEntity } from "../database-module/entities/user.entity"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TravelRoutesEntity,
            PlacesCommentsEntity,
            PlacesEntity,
            UserEntity
        ])
    ],
    providers: [SimpleTravelRouteService, UserRecommendationCommentService],
    exports: [SimpleTravelRouteService, UserRecommendationCommentService],
})
export class RecommendationModule{}
