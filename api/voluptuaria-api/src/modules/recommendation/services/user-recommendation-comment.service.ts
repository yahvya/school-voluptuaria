import { UserCommentsData } from "../data-contracts/user-comments.data"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { PlacesCommentsEntity } from "../../database-module/entities/places-comments.entity"
import { UserCommentsResponseDatas } from "../data-contracts/user-comments-response.datas"

/**
 * @brief service of user comment about recommendation
 */
export class UserRecommendationCommentService{

    constructor(
        @InjectRepository(PlacesCommentsEntity)
        protected readonly placeCommentsRepository : Repository<PlacesCommentsEntity>
    ) {
    }

    public async userRecommendationComment ( options : {
        userCommentsDatas : UserCommentsData
    }) : Promise<UserCommentsResponseDatas>{

        let result = new UserCommentsResponseDatas()
        const userCommentsDatas = options.userCommentsDatas;
        const {
            user_id,
            place_id,
            comment,
            wroteAt
        } = userCommentsDatas

        if((user_id == null) || (place_id == null) || (comment == null) || (wroteAt == null)){
            throw new Error('Information not completed');
        }
        else{
            try {
                await this.placeCommentsRepository.save({
                    userId : user_id,
                    placeId : place_id,
                    comment : comment,
                    commentedAt: new Date(wroteAt)
                })
                result.message = "OK"
                return result
            }
            catch (_){
                throw new Error(_)
            }
        }
    }
}
