import { Body, Get, HttpCode, Post } from "@nestjs/common"
import { SimpleTravelRouteResponseDatas } from "../data-contracts/simple-travel-route-response.datas"
import { SimpleTravelRouteService } from "../services/simple-travel-route.sevice"

/**
 * @brief travel route implementation controller
 * @
 */
export class TravelRouteController {
    constructor(
        protected readonly simpleTravelRouteService: SimpleTravelRouteService,
    ) {
    }

    /**
     * Saves a travel route with the provided data.
     *
     * @param {SimpleTravelRouteResponseDatas} simpleTravelRouteResponseDatas - The travel route data to be saved.
     * @param {string} name - The name of the travel route.
     * @param {string} userId - The ID of the user who owns the travel route.
     * @return {Promise<any>} The result of the save operation.
     */
    @Post()
    @HttpCode(200)
    public saveTravelRoute(
        @Body() simpleTravelRouteResponseDatas: SimpleTravelRouteResponseDatas,
        @Body() name :  string,
        @Body() userId : string
    ){
        return this.simpleTravelRouteService.saveTravelRoute({
            simpleTravelRouteResponseDatas,
            name,
            userId
        })
    }

    /**
     * Retrieves a travel route based on the provided user ID.
     *
     * @param {string} userId - The ID of the user whose travel route is to be fetched.
     * @return {TravelRoute} The travel route associated with the given user ID.
     */
    @Get()
    @HttpCode(200)
    public getTravelRouteByUserId(
        @Body() userId : string
    )
    {
        return this.simpleTravelRouteService.getTravelRouteByUserId(userId)
    }
}
