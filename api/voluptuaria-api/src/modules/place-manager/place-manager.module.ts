import { Module } from "@nestjs/common"
import { SearchPlaceService } from "./services/search-place.service"
import { GoogleMapsPlaceModule } from "../google-maps-place/google-maps-place.module"
import { OpenWeatherMapModule } from "../openwheatermap/openweathermap.module"
import { SearchPlaceController } from "./controllers/search-place.controllers"

@Module({
    providers: [SearchPlaceService],
    exports: [SearchPlaceService],
    imports: [GoogleMapsPlaceModule,OpenWeatherMapModule],
    controllers: [SearchPlaceController],
})
export class PlaceManagerModule{}
