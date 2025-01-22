import {
    IdGetter,
    IdGetterBuilder,
    IdSource,
} from '../../../configs/interfaces/id-getter.config';
import { GoogleMapsPlaceDto } from '../data-contracts/google-maps-place.dto';

/**
 * Google Maps place data id builder
 */
export class GoogleMapsPlaceIdBuilder implements IdGetterBuilder {
    private data: GoogleMapsPlaceDto

    buildIdData(): IdGetter {
        return {
            source: IdSource.GOOGLE_MAPS,
            idGetterConfig: {
                "accessId" : this.data.accessId
            }
        };
    }

    setRequiredData(data: GoogleMapsPlaceDto) {
        this.data = data
    }
}
