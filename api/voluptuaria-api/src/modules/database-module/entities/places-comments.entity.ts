import {
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from "typeorm"
import { UserEntity } from "./user.entity"
import { PlacesEntity } from "./places.entity"

/**
 * @brief places comments
 */
@Entity({
    name: "places_comments",
})
export class PlacesCommentsEntity {
    @PrimaryColumn({
        name: "user_id",
        type: "varchar",
        length: 36,
    })
    userId: string

    @PrimaryColumn({
        name: "place_id",
        type: "varchar",
        length: 36,
    })
    placeId: string

    @CreateDateColumn({
        name: "commented_at",
        type: "datetime",
        nullable: false,
    })
    commentedAt: Date

    @ManyToOne(() => UserEntity)
    @JoinColumn({
        name: "user_id",
    })
    user: UserEntity

    @ManyToOne(() => PlacesEntity)
    @JoinColumn({
        name: "place_id",
    })
    place: PlacesEntity
}
