import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

/**
 * @brief app registered places entity
 */
@Entity({
    name: "places"
})
export class PlacesEntity {
    @PrimaryGeneratedColumn(
        "uuid", {
        name: "id",
    })
    id: string

    @Column({
        name: "location_getter",
        type: "json",
        nullable: false,
    })
    locationGetter: any

    @Column({
        name: "categories",
        type: "json",
        nullable: false,
    })
    categories: any
}
