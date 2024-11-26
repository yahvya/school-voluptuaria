import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from "typeorm"
import { UserEntity } from "./user.entity"

/**
 * @brief user social profiles
 */
@Entity({
    name: "social_profile",
})
export class SocialProfileEntity {
    @PrimaryGeneratedColumn("uuid", {name: "id",})
    id: string

    @CreateDateColumn({name: "created_at", type: "datetime",nullable: false,})
    createdAt: Date

    @Column({ name: "user_id",type: "varchar", length: 36,nullable: false })
    userId: string

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: "user_id", })
    user: UserEntity
}
