import { Injectable } from "@nestjs/common"
import { RegisteredPlacesEntity } from "../../database/entities/registered-places.entity"
import { RebuiltRegisteredPlaceDto } from "../data-contracts/rebuilt-registered-place.dto"
import { IdSource } from "../../../configs/interfaces/id-getter.config"
import { GoogleMapsPlaceLoadableService } from "../../google-maps-place/utils/google-maps-place-loadable.service"

/**
 * Place rebuild service
 */
@Injectable()
export class PlaceRebuiltService {
    constructor(
        private readonly googleMapsPlaceLoadableService : GoogleMapsPlaceLoadableService
    ) {}

    public async fromRegisteredToData(
        {registeredPlaceEntity}:
        {registeredPlaceEntity:RegisteredPlacesEntity}
    ):Promise<RebuiltRegisteredPlaceDto|null>{
        try{
            // check from which element it comes from
            switch(registeredPlaceEntity.idGetter.source){
                case IdSource.GOOGLE_MAPS:
                    // rebuilt google maps
                    const loadedPlaceData = await this.googleMapsPlaceLoadableService.loadFrom({locationGetter: registeredPlaceEntity.locationConfig})

                    if(loadedPlaceData === null)
                        return null

                    const result = new RebuiltRegisteredPlaceDto()

                    result.dbId = registeredPlaceEntity.id
                    result.data = loadedPlaceData

                    return result
                default:
                    return null;
            }
        }
        catch (_){
            return null
        }
    }
}
