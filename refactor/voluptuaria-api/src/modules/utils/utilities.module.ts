import { Global, Module } from "@nestjs/common"
import { StringService } from "./services/string.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { RegisteredPlacesEntity } from "../database/entities/registered-places.entity"
import { PlaceRebuiltService } from "./services/place-rebuilt.service"
import { GoogleMapsPlaceModule } from "../google-maps-place/google-maps-place.module"

/**
 * Application utilities module
 */
@Module({
    imports: [TypeOrmModule.forFeature([RegisteredPlacesEntity]),GoogleMapsPlaceModule],
    providers: [StringService,PlaceRebuiltService],
    exports: [StringService,PlaceRebuiltService],
})
@Global()
export class UtilitiesModule {
}
