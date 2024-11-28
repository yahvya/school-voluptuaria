import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

/**
 * @brief categories entity
 */
@Entity({name: "categories"})
export class CategoriesEntity{
    @PrimaryGeneratedColumn("uuid",{name: "id"})
    public id: string

    @Column({name: "category_name",type: "varchar",length: 50,nullable: true,unique: true})
    public name: string
}
