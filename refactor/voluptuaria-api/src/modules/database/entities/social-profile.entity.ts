import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { UserEntity } from "./user.entity"
import { UserCategoriesLikeStateEntity } from "./user-categories-like-state.entity"

/**
 * Application user's social profiles
 */
@Entity({name: "social_profile"})
export class SocialProfileEntity{
    @PrimaryGeneratedColumn("uuid",{name: "id"})
    public id: string

    @CreateDateColumn({name: "created_at",nullable: false,type: "datetime"})
    public createdAt: Date

    @ManyToOne(() => UserEntity,(user:UserEntity) => user.userSocialProfiles)
    public user: UserEntity

    @OneToMany(() => UserCategoriesLikeStateEntity,(categoryLike:UserCategoriesLikeStateEntity) => categoryLike.socialProfile)
    public categoriesLikeState: UserCategoriesLikeStateEntity[]
}
