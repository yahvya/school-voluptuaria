import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { UserEntity } from "./user.entity"

/**
 * Application users like state on categories
 */
@Entity({name: "categories_like_state"})
export class UserCategoriesLikeStateEntity{
    @PrimaryGeneratedColumn("uuid",{name: "id"})
    public id: string

    @Column({name: "count_state",nullable: false,type: "integer"})
    public countState: number = 0

    @ManyToOne(() => UserEntity,(user: UserEntity) => user.categoriesLikeState)
    public user: UserEntity
}
