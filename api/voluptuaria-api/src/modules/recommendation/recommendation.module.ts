import { Module } from "@nestjs/common"
import { SimpleTravelRouteService } from "./services/simple-travel-route.sevice"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TravelRoutesEntity } from "../database-module/entities/travel-routes.entity"

@Module({
    imports: [TypeOrmModule.forFeature([TravelRoutesEntity])],
    providers: [SimpleTravelRouteService],
    exports: [SimpleTravelRouteService],
})
export class RecommendationModule{}
