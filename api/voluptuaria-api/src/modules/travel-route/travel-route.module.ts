import { Module } from "@nestjs/common"
import { SimpleTravelRouteService } from "./services/simple-travel-route.sevice"
import { GoogleMapsPlaceModule } from "../google-maps-place/google-maps-place.module"
import { OpenWeatherMapModule } from "../openwheatermap/openweathermap.module"


@Module({
    providers: [SimpleTravelRouteService],
    exports: [SimpleTravelRouteService],
    imports: []
})
export class TravelRouteModule {

}
