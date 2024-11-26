
import { SimpleTravelRouteResponseDatas } from "../data-contracts/simple-travel-route-response.datas"
import { SimpleTravelRouteDatas } from "../data-contracts/simple-travel-route.datas"

/**
 * @brief Simple travel route service
 */
export class SimpleTravelRouteService {

    /**
     * @brief Generate user travel route
     * @param options options
     * @returns {SimpleTravelRouteResponseDatas} route travel information
     */
    public async simpleTravelRoute(options :{
        simpleTravelRouteDatas :  SimpleTravelRouteDatas
    }) : Promise<SimpleTravelRouteResponseDatas> {
        const response = new SimpleTravelRouteResponseDatas()

        try {

        }catch (_){

        }

        return response
    }
}
