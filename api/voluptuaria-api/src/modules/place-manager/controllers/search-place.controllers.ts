import { , Controller, Get, HttpCode, Headers, UseGuards, Query } from "@nestjs/common"
import { SearchPlaceDatas } from "../data-contracts/search-place-datas"
import { SearchPlaceResponseData } from "../data-contracts/search-place-response-datas"
import { SearchPlaceService } from "../services/search-place.service"
import { VoluptuariaAuthGuard } from "../../../commons/guards/voluptuaria-auth.guard"

/**
 * @brief controller du search place
 */
@Controller("search")
@UseGuards(VoluptuariaAuthGuard)
export class SearchPlaceController {
    constructor(
        protected readonly searchPlaceService: SearchPlaceService,
    ) {}

    /**
     * @brief allow to search a place
     * @param searchPlaceDatas search place data
     * @param lang lang file name
     * @returns {Promise<SearchPlaceResponseData>} result data list
     */
    @Get("/place")
    @HttpCode(200)
    public searchPlace(
        @Headers("lang") lang:string,
        @Query() searchPlaceDatas : SearchPlaceDatas
    ): Promise<SearchPlaceResponseData[]> {
        return this.searchPlaceService.searchPlace({
            searchPlaceData: searchPlaceDatas,
            lang: lang
        })
    }
}
