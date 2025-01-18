import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { UserEntity } from "./user.entity"
import { RegisteredPlacesEntity } from "./registered-places.entity"

/**
 * Application user posted comment on a place
 */
@Entity({name: "users_comments"})
export class UserCommentsEntity{
    @PrimaryGeneratedColumn("uuid",{name: "id"})
    public id: string

    @Column({name: "comment",nullable: false,type: "text"})
    public comment: string

    @CreateDateColumn({name: "posted_at",nullable: false,type: "datetime"})
    public postedAt: Date

    @Column({name: "count_of_stars",nullable: false,type: "smallint"})
    public countOfStars: number

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: "user_id"})
    public byUser: UserEntity

    @ManyToOne(() => RegisteredPlacesEntity)
    @JoinColumn({name: "place_id"})
    public forPlace: RegisteredPlacesEntity
}
