import { SearchPlaceDatas } from "../data-contracts/search-place-datas"
import { SearchPlaceResponseData } from "../data-contracts/search-place-response-datas"
import { NotFoundException } from "@nestjs/common"
import { PlaceDatas } from "../../google-maps-place/data-contracts/place.datas"
import { GoogleMapsPlaceService } from "../../google-maps-place/services/google-maps-place.service"
import { OpenWeatherMapService } from "../../openwheatermap/services/openweathermap.service"

/**
 * @brief search place service
 */
export class SearchPlaceService {

    constructor(
        private readonly googleMapsPlaceService: GoogleMapsPlaceService,
        private readonly openWeatherMapService: OpenWeatherMapService,
    ) {
    }

    /**
     * @brief provide place data's by search string including weather datas
     * @param options
     * @returns {Promise<SearchPlaceResponseData[]>} place datas
     * @throws {Error} on error
     */
    public async searchPlace(options:{
        searchPlaceData : SearchPlaceDatas
    }): Promise<SearchPlaceResponseData[]> {

        if(!(options.searchPlaceData.research)){
            throw new NotFoundException("Research equal null")
        }

        if(!(options.searchPlaceData.lang)){
            throw new NotFoundException("lang equal null")
        }

        if(!(options.searchPlaceData.minRating)){
            throw new NotFoundException("minRating equal null")
        }

        try {
            const placeDatas : PlaceDatas[] = await this.googleMapsPlaceService.getPlacesDatasBySearch({
                search : options.searchPlaceData.research,
                lang : options.searchPlaceData.lang,
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

            // Wait for all promises to resolve
            const responses: SearchPlaceResponseData[] = await Promise.all(responsePromises);

            return responses;
        }
        catch (_){
            throw new NotFoundException("No research found")
        }
    }
}
