import { Module } from "@nestjs/common"
import { GoogleMapsPlaceModule } from "../google-maps-place/google-maps-place.module"
import { ApplicationRecommendationService } from "./services/application-recommendation.service"
import { ApplicationRecommendationController } from "./controllers/application-recommendation.controller"
import { ApplicationUserModule } from "../application-user/application-user.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserCommentsEntity } from "../database/entities/user-comments.entity"
import { RegisteredPlacesEntity } from "../database/entities/registered-places.entity"

/**
 * Application recommandation module
 */
@Module({
    imports: [GoogleMapsPlaceModule,ApplicationUserModule,TypeOrmModule.forFeature([UserCommentsEntity,RegisteredPlacesEntity])],
    exports: [ApplicationRecommendationService],
    providers: [ApplicationRecommendationService],
    controllers: [ApplicationRecommendationController]
})
export class ApplicationRecommandationModule{}
