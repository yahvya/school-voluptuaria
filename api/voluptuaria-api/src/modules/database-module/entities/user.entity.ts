import { Entity, PrimaryGeneratedColumn, Column,BeforeInsert, CreateDateColumn, } from "typeorm"

/**
 * @brief app users entity
 */
@Entity({
    name: "app_users"
})
export class UserEntity {
    @PrimaryGeneratedColumn(
        "uuid", {
        name: "id",
    })
    id: string

    @Column({
        name: "email",
        type: "varchar",
        length: 100,
        unique: true,
        nullable: false,
    })
    email: string

    @Column({
        name: "password",
        type: "varchar",
        length: 100,
        nullable: false,
    })
    password: string

    @Column({
        name: "user_name",
        type: "varchar",
        length: 20,
        nullable: false,
    })
    name: string

    @Column({
        name: "user_firstname",
        type: "varchar",
        length: 20,
        nullable: false,
    })
    firstName: string

    @Column({
        name: "birthdate",
        type: "date",
        nullable: true,
    })
    birthdate: Date

    @Column({
        name: "phonenumber",
        type: "varchar",
        length: 25,
        nullable: true,
    })
    phonenumber: string

    @Column({
        name: "profile_picture",
        type: "varchar",
        length: 50,
        nullable: true,
    })
    profilePictureLink: string

    @CreateDateColumn({
        name: "created_at",
        type: "datetime",
        nullable: false
    })
    createdAt: Date

    @Column({
        name: "gender",
        type: "tinyint",
        nullable: false,
    })
    gender: number
}
