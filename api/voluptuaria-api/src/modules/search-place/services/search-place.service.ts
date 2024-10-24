import { SearchPlaceDatas } from "../data-contracts/search-place-datas"
import { SearchPlaceResponseData } from "../data-contracts/search-place-response-datas"
import { NotFoundException } from "@nestjs/common"

/**
 * @brief search place service
 */
export class SearchPlaceService {

    public async searchPlace(options:{
        searchPlaceData : SearchPlaceDatas
    }): Promise<SearchPlaceResponseData> {
        const response = new SearchPlaceResponseData()
        const research = options.searchPlaceData

        if(!research){
           throw new NotFoundException("Research equal null")
        }

        try {

        }
        catch (_){
            throw new NotFoundException("No research found")
        }
        return response
    }
}
