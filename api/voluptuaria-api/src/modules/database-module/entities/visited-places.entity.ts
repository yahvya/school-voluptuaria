import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm"
import { UserEntity } from "./user.entity"
import { PlacesEntity } from "./places.entity"

/**
 * @brief user visited places
 */
@Entity({name: "visited_places"})
export class VisitedPlacesEntity {
    @PrimaryColumn({name: "user_id",type: "varchar",length: 36,})
    userId: string

    @PrimaryColumn({name: "place_id",type: "varchar",length: 36,})
    placeId: string

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: "user_id",})
    user: UserEntity

    @ManyToOne(() => PlacesEntity)
    @JoinColumn({name: "place_id",})
    place: PlacesEntity
}
