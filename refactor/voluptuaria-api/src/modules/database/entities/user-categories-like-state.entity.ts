import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { PlaceCategoriesEntity } from "./place-categories.entity"
import { SocialProfileEntity } from "./social-profile.entity"

/**
 * Application users like state on categories
 */
@Entity({name: "categories_like_state"})
export class UserCategoriesLikeStateEntity{
    @PrimaryGeneratedColumn("uuid",{name: "id"})
    public id: string

    @Column({name: "count_state",nullable: false,type: "integer"})
    public countState: number = 0

    @ManyToOne(() => SocialProfileEntity,(socialProfile: SocialProfileEntity) => socialProfile.categoriesLikeState)
    public socialProfile: SocialProfileEntity

    @ManyToOne(() => PlaceCategoriesEntity)
    public category: PlaceCategoriesEntity
}
