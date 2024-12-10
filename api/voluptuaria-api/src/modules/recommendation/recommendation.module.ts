import { Module } from "@nestjs/common"
import { SimpleTravelRouteService } from "./services/simple-travel-route.sevice"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TravelRoutesEntity } from "../database-module/entities/travel-routes.entity"
import { UserRecommendationCommentService } from "./services/user-recommendation-comment.service"

@Module({
    imports: [TypeOrmModule.forFeature([TravelRoutesEntity])],
    providers: [SimpleTravelRouteService,UserRecommendationCommentService],
    exports: [SimpleTravelRouteService,UserRecommendationCommentService],
})
export class RecommendationModule{}
