import { Body,HttpCode, Post } from "@nestjs/common"
import { SimpleTravelRouteResponseDatas } from "../data-contracts/simple-travel-route-response.datas"
import { SimpleTravelRouteDatas } from "../data-contracts/simple-travel-route.datas"
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
    @Post()
    @HttpCode(200)
    public travelRoute(
        //@Body() simpleTravelRouteDatas: SimpleTravelRouteDatas,
    ) : Promise<SimpleTravelRouteResponseDatas> {
        // Valeurs simulées pour le test
        const testData: SimpleTravelRouteDatas = {
            zone: 'corte',
            budget: 500,
            start_date: '2024-11-30',
            end_date: '2024-12-05',
        };

        console.log('Test Data:', testData);

        return this.simpleTravelRouteService.simpleTravelRoute({
            simpleTravelRouteDatas: testData
        })
    }
}
