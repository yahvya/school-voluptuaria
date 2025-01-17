import { UserRecommendationLikeData } from "../data-contracts/user-recommendation-like.data"
import { UserRecommendationLikeResponseData } from "../data-contracts/user-recommendation-like-response.data"
import { CategoriesEntity } from "../../database-module/entities/categories.entity"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { CategoryEntityData } from "../data-contracts/category-entity-data"
import { LikedCategoriesEntity } from "../../database-module/entities/liked-categories.entity"
import { UnLikedCategoriesEntity } from "../../database-module/entities/unliked-categories.entity"


/**
 * @brief UserRecommandationLike Service to add the liked or unliked category
 */
export class UserRecommendationLikeService {

    constructor(
        @InjectRepository(CategoriesEntity)
        private readonly categories : Repository<CategoriesEntity>,
        @InjectRepository(LikedCategoriesEntity)
        private readonly likedCategories : Repository<LikedCategoriesEntity>,
        @InjectRepository(UnLikedCategoriesEntity)
        private readonly unlikedCategories : Repository<UnLikedCategoriesEntity>,
    ) {
    }

    /**
     * @brief function for userRecommendationLike
     * @param options
     * @return {UserRecommendationLikeResponseData} response of adding the user like or unlike. Return null in case of success
     */
    public async userRecommendationLike(options :{
        userRecommendationLikeData : UserRecommendationLikeData;
    }) : Promise<UserRecommendationLikeResponseData> {
        let result = new UserRecommendationLikeResponseData()
        const userRecommandationLikeData = options.userRecommendationLikeData;
        const {
            socialProfile_id,
            category_name,
            like
        } = userRecommandationLikeData

        if((socialProfile_id == null) || (category_name == null) || (like == null)){
            throw new Error('Information not completed');
        }

        const category = await this.searchCategory(category_name)

        if(like){
            // like est true du coup il aime la category
            let place = await this.likedCategories.findOneBy({placeCategoryId : category.id})
            if(place){
                // Incrémente la valeur de searchfrequency
                place.searchFrequency += 1;
                await this.likedCategories.save(place);
                result.message = null
            }
            if(!place){
                place = this.likedCategories.create({
                    socialProfileId : socialProfile_id,
                    placeCategoryId: category.id,
                    searchFrequency: 1,
                });
                await this.likedCategories.save(place);
                result.message = null
            }

        }
        if(!like){
            // like est false du coup il n'aime pas la category
            let place = await this.unlikedCategories.findOneBy({placeCategoryId : category.id})
            if(place){
                // Incremente la valeur de dislikeCount
                place.dislikeCount += 1;
                await this.likedCategories.save(place);
                result.message = null
            }
            if(!place){
                place = await this.unlikedCategories.create({
                    socialProfileId : socialProfile_id,
                    placeCategoryId : category.id,
                    dislikeCount: 1,
                })
                await this.likedCategories.save(place);
                result.message = null
            }
        }
        return result
    }

    /**
     * @brief function to search category in table and add if isn't
     * @param category_name
     * @return {category} the category finded
     */
    public async searchCategory(category_name) : Promise<CategoryEntityData> {
        try {
            let category = await this.categories.findOneBy({name: category_name})
            if(!category){
                category = await this.categories.create({name: category_name})
            }
            return category
        }catch(error){
            throw error
        }
    }
}
