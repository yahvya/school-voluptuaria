import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

/**
 * @brief app genders
 */
export enum Gender {
    UNDEFINED = 0,
    MAN = 1,
    WOMAN = 2,
}

/**
 * @brief users entity
 */
@Entity({name: "app_users"})
export class UserEntity{
    @PrimaryGeneratedColumn("uuid",{name: "id"})
    public id: string

    @Column({name: "email",nullable: false,unique: true,type: "varchar",length: 100})
    public email: string

    @Column({name: "password",nullable: false,type: "varchar",length: 100})
    public password: string

    @Column({name: "user_name",type: "varchar",length: 20,nullable: false,})
    name: string

    @Column({name: "user_firstname", type: "varchar",length: 20, nullable: false, })
    firstName: string

    @Column({ name: "birthdate",type: "date",nullable: true, })
    birthdate: Date

    @Column({ name: "phonenumber",type: "varchar",length: 25, nullable: true, })
    phonenumber: string

    @Column({ name: "profile_picture", type: "varchar",length: 50,nullable: true,})
    profilePictureLink: string

    @CreateDateColumn({ name: "created_at", type: "datetime",nullable: false,})
    createdAt: Date

    @Column({ name: "gender", type: "enum", enum: Gender, nullable: false, })
    gender: Gender;
}
