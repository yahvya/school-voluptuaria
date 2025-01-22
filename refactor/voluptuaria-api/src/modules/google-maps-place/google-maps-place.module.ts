import { Module } from "@nestjs/common"
import { GoogleMapsPlaceService } from "./services/google-maps-place.service"
import { LangModule } from "../lang-module/lang.module"
import { OpenweathermapModule } from "../openweathermap/openweathermap.module"

@Module({
    imports: [LangModule,OpenweathermapModule],
    exports: [GoogleMapsPlaceService],
    providers: [GoogleMapsPlaceService],
})
export class GoogleMapsPlaceModule{}
