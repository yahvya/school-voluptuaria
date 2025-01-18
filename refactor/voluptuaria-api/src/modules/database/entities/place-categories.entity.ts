import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

/**
 * Application registered place's categories
 */
@Entity({name: "place_categories"})
export class PlaceCategoriesEntity{
    @PrimaryGeneratedColumn("uuid",{name: "id"})
    public id: string

    @Column({name: "category_name",nullable: false,unique: true,type: "varchar",length: 30})
    public categoryName: string
}
