import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { SocialProfileEntity } from "./social-profile.entity"
import { CategoriesEntity } from "./categories.entity"

/**
 * @brief user social profile unliked categories
 */
@Entity({name: "potential_unliked_categories"})
export class LikedCategoriesEntity{
    @PrimaryColumn({name: "social_profile_id",type: "varchar",length: 36,})
    public socialProfileId: string

    @PrimaryColumn({name: "place_category_id",type: "varchar",length: 36,})
    public placeCategoryId: string

    @Column({name: "dislike_count",type: "int",nullable: false})
    public dislikeCount: number

    @ManyToOne(() => SocialProfileEntity)
    @JoinColumn({name: "social_profile_id",})
    socialProfile: SocialProfileEntity

    @ManyToOne(() => CategoriesEntity)
    @JoinColumn({name: "place_category_id",})
    category: CategoriesEntity
}
