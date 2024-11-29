import { SearchPlaceDatas } from "../data-contracts/search-place-datas"
import { SearchPlaceResponseData } from "../data-contracts/search-place-response-datas"
import { Injectable, NotFoundException } from "@nestjs/common"
import { PlaceDatas } from "../../google-maps-place/data-contracts/place.datas"
import { GoogleMapsPlaceService } from "../../google-maps-place/services/google-maps-place.service"
import { OpenWeatherMapService } from "../../openwheatermap/services/openweathermap.service"

/**
 * @brief search place service
 */
@Injectable()
export class SearchPlaceService {
    constructor(
        protected readonly googleMapsPlaceService: GoogleMapsPlaceService,
        protected readonly openWeatherMapService: OpenWeatherMapService
    ) {
    }

    /**
     * @brief provide place data's by search string including weather datas
     * @param options
     * @returns {Promise<SearchPlaceResponseData[]>} place datas
     * @throws {Error} on error
     */
    public async searchPlace(options:{
        searchPlaceData : SearchPlaceDatas,
        lang:string
    }): Promise<SearchPlaceResponseData[]> {
        if(!(options.searchPlaceData.search)){
            throw new NotFoundException("Research equal null")
        }

        if(!(options.searchPlaceData.minRating)){
            throw new NotFoundException("minRating equal null")
        }

        try {
            const placeDatas : PlaceDatas[] = await this.googleMapsPlaceService.getPlacesDatasBySearch({
                search : options.searchPlaceData.search,
                lang : options.lang,
                minRating : options.searchPlaceData.minRating
            })

            const responsePromises = placeDatas.map(async (place) => {
                const weatherData =  await this.openWeatherMapService.getMeteoDatas({
                    coordinates: place.coordinate
                });


                const response = new SearchPlaceResponseData()
                response.place_name = place.placeName
                response.coordinates = place.coordinate
                response.access_id = place.accessId
                response.comments = place.comments
                response.prices = place.prices
                response.is_opened_now = place.isOpenedNow
                response.image = place.images
                response.categories = place.categories
                response.weather = weatherData
                response.callback_datas = {}

                return response
            });

            console.log("Données de responsePromises :", responsePromises); //

            // Wait for all promises to resolve
            const responses: SearchPlaceResponseData[] = await Promise.all(responsePromises);

            console.log("Données de responses :", responses); //

            return responses;
        }
        catch (error){
            throw new NotFoundException("No research found")
        }
    }
}
