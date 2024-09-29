import { InjectRepository } from "@nestjs/typeorm"
import { UserEntity } from "../../database-module/entities/user.entity"
import { Repository } from "typeorm"
import { UserTravelRouteResponse } from "./user-travel-route-response"

export class UserTravelRouteService {
    constructor(
        @InjectRepository(UserEntity)
        protected readonly userRepository: Repository<UserEntity>,
    ) {}

    /**
     * @brief generate simple travel route by user.
     * @param options travel options
     * @returns {UserTravelRouteResponse} Validation's Result.
     * @throws {Error} in case of error
     */

    public async getGeneretedRoutes(options: {
        userTravelRouteDatas: UserTravelRouteResponse
    }): Promise<UserTravelRouteResponse[]> {
        return [new UserTravelRouteResponse()]
    }
}
