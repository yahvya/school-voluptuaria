import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm"
import { UserEntity } from "./user.entity"

/**
 * @brief generated travel routes for users
 */
@Entity({
    name: "travel_routes",
})
export class TravelRoutesEntity {
    @PrimaryGeneratedColumn({
        name: "id",
        type: "int",
    })
    id: number

    @Column({
        name: "route_name",
        type: "varchar",
        length: 50,
        nullable: false,
    })
    routeName: string

    @Column({
        name: "start_date",
        type: "date",
        nullable: false,
    })
    startDate: Date

    @Column({
        name: "end_date",
        type: "date",
        nullable: false,
    })
    endDate: Date

    @Column({
        name: "budget",
        type: "decimal",
        precision: 15,
        scale: 2,
        nullable: false,
    })
    budget: number

    @Column({
        name: "proposals",
        type: "json",
        nullable: false,
    })
    proposals: any

    @Column({
        name: "user_id",
        type: "varchar",
        length: 36,
        nullable: false,
    })
    userId: string

    @ManyToOne(() => UserEntity)
    @JoinColumn({
        name: "user_id",
    })
    user: UserEntity
}
