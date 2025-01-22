import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { SocialProfileEntity } from "./social-profile.entity"
import { UserCategoriesLikeStateEntity } from "./user-categories-like-state.entity"
import { RegisteredPlacesEntity } from "./registered-places.entity"
import { TravelRoutesEntity } from "./travel-routes.entity"

/**
 * User gender possibilities
 */
export enum UserGender{
    MAN,
    WOMAN
}

/**
 * Application users entity
 */
@Entity({name: "application_users"})
export class UserEntity{
    @PrimaryGeneratedColumn("uuid",{name: "id"})
    public id: string

    @Column({name: "email",unique: true,nullable: false,type: "varchar",length: 50})
    public email: string

    @Column({name: "password",nullable: false,type: "varchar",length: 90})
    public password: string

    @Column({name: "birthdate",nullable: true,type: "date"})
    public birthdate: Date = null

    @Column({name: "user_name",nullable: false,type: "varchar",length: 50})
    public userName:string

    @Column({name: "user_firstname",nullable: false,type: "varchar",length: 50})
    public userFirstname:string

    @Column({name: "phone_number",nullable: true,type: "varchar",length: 20})
    public phoneNumber: string = null

    @CreateDateColumn({name: "account_creation_date",nullable: false,type: "datetime"})
    public accountCreationDate: Date

    @Column({name: "gender",nullable: true,type: "enum",enum: UserGender})
    public gender: UserGender = null

    @Column({name: "profile_picture_path",nullable: true,type: "varchar",length: 255})
    public profilePicturePath: string = null

    @OneToMany(() => SocialProfileEntity,(socialProfile:SocialProfileEntity) => socialProfile.user,{eager: true})
    public userSocialProfiles: SocialProfileEntity[]

    @ManyToMany(() => RegisteredPlacesEntity)
    @JoinTable({name: "user_wish_list",joinColumn: {name: "user_id"},inverseJoinColumn: {name: "place_id"}})
    public wishList: RegisteredPlacesEntity[]

    @ManyToMany(() => RegisteredPlacesEntity)
    @JoinTable({name: "user_visited_places",joinColumn: {name: "user_id"},inverseJoinColumn: {name: "place_id"}})
    public visitedPlaces: RegisteredPlacesEntity[]

    @OneToMany(() => TravelRoutesEntity,(travelRoute: TravelRoutesEntity) => travelRoute.forUser)
    public travelRoutes: TravelRoutesEntity[]
}
