import { Controller, Get } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { GoogleMapsPlaceService } from "../../google-maps-place/services/google-maps-place.service"

@Controller("test")
export class TestController {
    constructor(
        protected configService: ConfigService,
        protected googleMapPlaceService: GoogleMapsPlaceService
    ) {
    }

    @Get("test-google-map")
    public async testGoogleMapApi(){
        await this.googleMapPlaceService.getPlacesDatasBySearch({search: "recherche",lang: "french",minRating: 1})

        return {}
    }
}
