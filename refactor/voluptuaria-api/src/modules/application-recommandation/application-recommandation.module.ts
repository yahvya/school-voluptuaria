import { Module } from "@nestjs/common"
import { GoogleMapsPlaceModule } from "../google-maps-place/google-maps-place.module"
import { ApplicationRecommendationService } from "./services/application-recommendation.service"
import { ApplicationRecommendationController } from "./controllers/application-recommendation.controller"

/**
 * Application recommandation module
 */
@Module({
    imports: [GoogleMapsPlaceModule],
    exports: [ApplicationRecommendationService],
    providers: [ApplicationRecommendationService],
    controllers: [ApplicationRecommendationController]
})
export class ApplicationRecommandationModule{}
