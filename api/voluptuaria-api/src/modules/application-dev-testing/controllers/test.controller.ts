import { Controller, Get } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { GoogleMapsPlaceService } from "../../google-maps-place/services/google-maps-place.service"
import { SearchPlaceService } from "../../search-place/services/search-place.service"

@Controller("test")
export class TestController {
    constructor(
        protected configService: ConfigService,
        protected googleMapPlaceService: GoogleMapsPlaceService,
        protected searchPlaceService: SearchPlaceService,
    ) {
    }

    @Get("test-google-map")
    public async testGoogleMapApi(){
        await this.googleMapPlaceService.getPlacesDatasBySearch({search: "recherche",lang: "french",minRating:2})

        return {}
    }

    @Get("test-place")
    public async testSearchPlace(){
        await this.searchPlaceService.searchPlace({
            searchPlaceData : {
                minRating : 2,
                lang : "fr",
                research : "hotels"
            }
        })

        return {}
    }
}
