import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { IdGetter } from "../../../configs/interfaces/id-getter.config"
import { LocationGetterConfig } from "../../../configs/interfaces/location-getter.config"
import { PlaceCategoriesEntity } from "./place-categories.entity"

/**
 * Application extracted and registered places from apis
 */
@Entity({name: "registered_places"})
export class RegisteredPlacesEntity{
    @PrimaryGeneratedColumn("uuid",{name: "id"})
    public id: string

    @CreateDateColumn({name: "registered_at",type: "datetime",nullable: false})
    public registeredAt: Date

    @Column({name: "id_getter",type: "json",nullable: false})
    public idGetter: IdGetter

    @Column({name: "location_getter",type: "json",nullable: false})
    public locationConfig: LocationGetterConfig

    @ManyToMany(() => PlaceCategoriesEntity)
    @JoinTable({name: "registered_places_categories",joinColumn: {name: "place_id"},inverseJoinColumn: {name: "category_id"}})
    public categories: PlaceCategoriesEntity[]
}
