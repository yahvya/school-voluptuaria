import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { UserEntity } from "./user.entity"

/**
 * Application accepted travel routes by user
 */
@Entity({name: "travel_routes"})
export class TravelRoutesEntity{
    @PrimaryGeneratedColumn("uuid",{name: "id"})
    public id: string

    @Column({name: "location_address",nullable: false,type: "varchar",length: 255})
    public locationAddress:string

    @Column({name: "start_date",nullable: false,type: "date"})
    public startDate: Date

    @Column({name: "end_date",nullable: false,type: "date"})
    public endDate: Date

    @Column({name: "initial_budget",nullable: false,type: "decimal",precision: 2})
    public initialBudget: number

    @ManyToOne(() => UserEntity,(user:UserEntity) => user.travelRoutes)
    @JoinColumn({name: "for_user"})
    public forUser:UserEntity
}
