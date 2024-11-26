import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { PlacesEntity } from "./places.entity"
import { CategoriesEntity } from "./categories.entity"

/**
 * @brief places linked categories
 */
@Entity({name: "place_categories"})
export class PlaceCategoriesEntity{
    @PrimaryColumn({name: "registered_place_id",type: "varchar",length: 36,})
    public registeredPlaceId: string

    @PrimaryColumn({name: "place_category_id",type: "varchar",length: 36,})
    public placeCategoryId: string

    @ManyToOne(() => PlacesEntity)
    @JoinColumn({name: "registered_place_id"})
    public registeredPlace: PlacesEntity

    @ManyToOne(() => CategoriesEntity)
    @JoinColumn({name: "place_category_id"})
    public category: CategoriesEntity
}
