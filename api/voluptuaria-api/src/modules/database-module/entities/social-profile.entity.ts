import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm"
import { UserEntity } from "./user.entity"

/**
 * @brief user social profiles
 */
@Entity({
    name: "social_profile"
})
export class SocialProfileEntity {
    @PrimaryGeneratedColumn(
        "uuid", {
        name: "id",
    })
    id: string

    @CreateDateColumn({
        name: "crated_at",
        type: "datetime",
        nullable: false,
    })
    cratedAt: Date

    @Column({
        name: "liked_categories",
        type: "json",
        nullable: false,
    })
    likedCategories: any

    @Column({
        name: "unliked_categories",
        type: "json",
        nullable: false,
    })
    unlikedCategories: any

    @Column({
        name: "searched_categories",
        type: "json",
        nullable: false,
    })
    searchedCategories: any

    @Column({
        name: "user_id",
        type: "varchar",
        length: 36,
        nullable: false,
    })
    userId: string

    @ManyToOne(() => UserEntity)
    @JoinColumn({
        name: "user_id",
    })
    user: UserEntity
}
