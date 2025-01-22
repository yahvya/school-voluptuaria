import { Module } from "@nestjs/common"
import { GoogleMapsPlaceModule } from "../google-maps-place/google-maps-place.module"
import { ApplicationRecommendationService } from "./services/application-recommendation.service"
import { ApplicationRecommendationController } from "./controllers/application-recommendation.controller"
import { ApplicationUserModule } from "../application-user/application-user.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserCommentsEntity } from "../database/entities/user-comments.entity"
import { RegisteredPlacesEntity } from "../database/entities/registered-places.entity"
import { SocialProfileEntity } from "../database/entities/social-profile.entity"
import { UserCategoriesLikeStateEntity } from "../database/entities/user-categories-like-state.entity"
import { PlaceCategoriesEntity } from "../database/entities/place-categories.entity"

/**
 * Application recommandation module
 */
@Module({
    imports: [GoogleMapsPlaceModule,ApplicationUserModule,TypeOrmModule.forFeature([UserCommentsEntity,RegisteredPlacesEntity,SocialProfileEntity,UserCategoriesLikeStateEntity,PlaceCategoriesEntity])],
    exports: [ApplicationRecommendationService],
    providers: [ApplicationRecommendationService],
    controllers: [ApplicationRecommendationController]
})
export class ApplicationRecommandationModule{}
