import { IdSource } from "../../../configs/interfaces/id-getter.config"
import { GoogleMapsPlaceDto } from "../data-contracts/google-maps-place.dto"
import { LocationGetterBuilder, LocationGetterConfig } from "../../../configs/interfaces/location-getter.config"

/**
 * Google Maps place data location builder
 */
export class GoogleMapsPlaceLocationBuilder implements LocationGetterBuilder {
    private data: GoogleMapsPlaceDto

    buildLocationData(): LocationGetterConfig {
        return {
            source: IdSource.GOOGLE_MAPS,
            locationGetConfig: {
                "accessId" : this.data.accessId,
                "lang": this.data.lang
            }
        }
    }

    setRequiredData(data: any) {
        this.data = data
    }
}
