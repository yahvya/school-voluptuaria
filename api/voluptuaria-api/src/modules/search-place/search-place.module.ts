import { Module } from "@nestjs/common"
import { SearchPlaceService } from "./services/search-place.service"
import { GoogleMapsPlaceModule } from "../google-maps-place/google-maps-place.module"
import { OpenWeatherMapModule } from "../openwheatermap/openweathermap.module"

/**
 * @brief google maps places api modulex
 */
@Module({
    providers: [SearchPlaceService],
    exports: [SearchPlaceService],
    imports: [GoogleMapsPlaceModule,OpenWeatherMapModule]
})
export class SearchPlaceModule {
}
