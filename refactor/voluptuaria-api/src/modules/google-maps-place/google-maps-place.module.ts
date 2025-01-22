import { Module } from "@nestjs/common"
import { GoogleMapsPlaceService } from "./services/google-maps-place.service"
import { LangModule } from "../lang-module/lang.module"
import { OpenweathermapModule } from "../openweathermap/openweathermap.module"
import { GoogleMapsPlaceLoadable } from "./utils/google-maps-place-loadable"
import { TypeOrmModule } from "@nestjs/typeorm"
import { RegisteredPlacesEntity } from "../database/entities/registered-places.entity"

@Module({
    imports: [LangModule,OpenweathermapModule,TypeOrmModule.forFeature([RegisteredPlacesEntity])],
    exports: [GoogleMapsPlaceService,GoogleMapsPlaceLoadable],
    providers: [GoogleMapsPlaceService,GoogleMapsPlaceLoadable],
})
export class GoogleMapsPlaceModule{}
