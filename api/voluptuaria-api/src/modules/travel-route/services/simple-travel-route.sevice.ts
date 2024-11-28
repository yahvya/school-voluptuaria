
import { SimpleTravelRouteResponseDatas } from "../data-contracts/simple-travel-route-response.datas"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { TravelRoutesEntity } from "../../database-module/entities/travel-routes.entity"
import { BadRequestException } from "@nestjs/common"

/**
 * @brief Simple travel route service
 */
export class SimpleTravelRouteService {

    constructor(
        @InjectRepository(TravelRoutesEntity)
        protected readonly travelRouteRepository : Repository<TravelRoutesEntity>
    ) {
    }
    /**
     * @brief function to save the travel route on database
     * @param options options
     * @returns {null || Error message} if it is good or error message if it is bad
     */
    public async saveTravelRoute(options : {
        simpleTravelRouteResponseDatas : SimpleTravelRouteResponseDatas,
        name : string,
        userId : string
    }) {
        const simpleTravelRouteDatas = options.simpleTravelRouteResponseDatas;
        const {
            budget,
            start_date,
            end_date,
            proposals
        } = simpleTravelRouteDatas
        const name : string = options.name

        if( (name == null)||
            (budget == null)||
            (start_date == null)||
            (end_date == null)||
            (proposals == null)){
            throw new Error('bad input');
        }
        else{
            try {
                // save the travel route in database
                await this.travelRouteRepository.save({
                    userId: options.userId,
                    routeName : name,
                    start_date : start_date,
                    endDate : end_date,
                    budget : budget,
                    proposals : proposals,
                })
                console.log('Travel route saved successfully!');
            }
            catch (_){
                throw new Error(_)
            }
        }

    }

    /**
     * Retrieves the travel route information for a specific user by their user ID.
     *
     * @param {string} userId - The unique identifier of the user whose travel route is being retrieved.
     * @return {Promise<object>} - A promise that resolves to the travel route information of the user.
     * @throws {BadRequestException} - Thrown if the userId parameter is null or undefined.
     * @throws {Error} - Thrown if there is an issue retrieving the travel route from the repository.
     */
    public async getTravelRouteByUserId(
        userId : string,
    ){
        if (userId == null || userId == undefined){
            throw new BadRequestException('Name parameter is required');
        }
        else {
            try {
                await this.travelRouteRepository.findBy({
                    userId : userId
                })
            }
            catch (_){
                throw new Error(_)
            }
        }
    }

}
