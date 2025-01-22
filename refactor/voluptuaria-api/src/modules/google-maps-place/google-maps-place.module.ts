import { Module } from "@nestjs/common"
import { GoogleMapsPlaceService } from "./services/google-maps-place.service"
import { LangModule } from "../lang-module/lang.module"
import { OpenweathermapModule } from "../openweathermap/openweathermap.module"
import { GoogleMapsPlaceLoadableService } from "./utils/google-maps-place-loadable.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { RegisteredPlacesEntity } from "../database/entities/registered-places.entity"
import { PlaceCategoriesEntity } from "../database/entities/place-categories.entity"

@Module({
    imports: [LangModule,OpenweathermapModule,TypeOrmModule.forFeature([RegisteredPlacesEntity,PlaceCategoriesEntity])],
    exports: [GoogleMapsPlaceService,GoogleMapsPlaceLoadableService],
    providers: [GoogleMapsPlaceService,GoogleMapsPlaceLoadableService],
})
export class GoogleMapsPlaceModule{}
