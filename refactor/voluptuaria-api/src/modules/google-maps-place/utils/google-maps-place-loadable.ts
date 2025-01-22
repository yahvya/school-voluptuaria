import { LoadableFromLocationGetter, LocationGetterConfig } from "../../../configs/interfaces/location-getter.config"
import { GoogleMapsPlaceDto } from "../data-contracts/google-maps-place.dto"
import { Injectable } from "@nestjs/common"
import { GoogleMapsPlaceService } from "../services/google-maps-place.service"

/**
 * Google maps loader
 */
@Injectable()
export class GoogleMapsPlaceLoadable implements LoadableFromLocationGetter{
    constructor(
        private readonly googleMapsPlaceService: GoogleMapsPlaceService
    ) {}

    async loadFrom(
        { locationGetter }:
        { locationGetter: LocationGetterConfig }
    ) :Promise<GoogleMapsPlaceDto|null>{
        try{
            return this.googleMapsPlaceService.loadFromId({accessId: locationGetter.locationGetConfig["accessId"],lang: locationGetter.locationGetConfig["lang"]})
        }
        catch (_){
            return null
        }
    }
}
