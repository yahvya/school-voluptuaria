import { Body, Controller, Get, HttpCode, Post, UseGuards } from "@nestjs/common"
import { SearchPlaceDatas } from "../data-contracts/search-place-datas"
import { SearchPlaceResponseData } from "../data-contracts/search-place-response-datas"
import { SearchPlaceService } from "../services/search-place.service"
import { VoluptuariaAuthGuard } from "../../../commons/guards/voluptuaria-auth.guard"

/**
 * @brief controller du search place
 */
@Controller("search-place")
//@UseGuards(VoluptuariaAuthGuard)
export class SearchPlaceController {
    constructor(
        protected readonly searchPlaceService: SearchPlaceService,
    ) {
    }
    @Get()
    @HttpCode(200)
    public searchPlace(
        @Body() searchPlaceDatas : SearchPlaceDatas
    ): Promise<SearchPlaceResponseData[]> {
        return this.searchPlaceService.searchPlace({
            searchPlaceData: searchPlaceDatas
        })
    }
}
