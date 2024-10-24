import { Module } from "@nestjs/common"
import { GoogleMapsPlaceService } from "./services/google-maps-place.service"

/**
 * @brief google maps places api module
 */
@Module({
    providers: [GoogleMapsPlaceService],
    exports: [GoogleMapsPlaceService]
})
export class GoogleMapsPlaceModule {
}
