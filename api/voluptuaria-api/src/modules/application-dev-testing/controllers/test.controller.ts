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
    public testGoogleMapApi(){
        return this.googleMapPlaceService.getPlacesDatasBySearch({search: "recherche",lang: "french",minRating: 1})
    }

    @Get("test-place")
    public testSearchPlace(){
        return this.searchPlaceService.searchPlace({
            searchPlaceData : {
                minRating : 2,
                lang : "french",
                research : "hotels"
            }
        })
    }
}
