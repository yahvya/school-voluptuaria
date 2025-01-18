import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { UserEntity } from "./user.entity"

/**
 * Application user's social profiles
 */
@Entity({name: "social_profile"})
export class SocialProfileEntity{
    @PrimaryGeneratedColumn("uuid",{name: "id"})
    public id: string

    @CreateDateColumn({name: "created_at",nullable: false,type: "datetime"})
    public createdAt: Date

    @OneToMany(() => UserEntity,(user:UserEntity) => user.userSocialProfiles)
    public user: UserEntity
}
