import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "../../../app.module"
import { UserAccountService } from "./user-account.service"
import { UserEntity, UserGender } from "../../database/entities/user.entity"
import { ApplicationUserModule } from "../application-user.module"
import { UserAccountDto } from "../data-contracts/account-management/user-account.dto"
import { Repository } from "typeorm"
import { getRepositoryToken } from "@nestjs/typeorm"

describe("Test user account service",() => {
    let userAccountService:UserAccountService
    let testUserEntity:UserEntity
    let userRepository:Repository<UserEntity>
    let module:TestingModule

    beforeAll(async () => {
        module = await Test
            .createTestingModule({
                imports: [AppModule,ApplicationUserModule]
            })
            .compile()

        userAccountService = module.get(UserAccountService)
        userRepository = module.get(getRepositoryToken(UserEntity))

        testUserEntity  = new UserEntity()
        Object.assign(testUserEntity,{
            id: "some_id",
            userFirstname: "test firstname",
            userName: "test name",
            profilePicturePath: null,
            phoneNumber: "test phone number",
            email: "test email",
            birthdate: null,
            accountCreationDate: new Date(),
            gender: UserGender.MAN,
            password: "test pwd"
        })
    })

    describe("Test user entity conversion to an account data contract", () => {
        it("should generate a valid data contract",() => {
            const convertedEntity = userAccountService.fromEntityToDto({userEntity: testUserEntity})

            expect(convertedEntity).toBeInstanceOf(UserAccountDto)
        })
    })

    describe("Test user searching", () => {
        beforeAll(async () => {
            await userRepository.save(testUserEntity)
        })

        it("should return a user account dto",async () => {
            await expect(userAccountService.findUserFromEmail({email: testUserEntity.email})).resolves.toBeInstanceOf(UserEntity)
        })

        it("should return null as the account doesn't exist",async () => {
            await expect(userAccountService.findUserFromEmail({email: "bad email"})).resolves.toBe(null)
        })

        it("should return a user account dto containing the test entity email",async () => {
            const resultAccountDto = await userAccountService.findUserFromEmail({email: testUserEntity.email})

            expect(resultAccountDto.email).toBe(testUserEntity.email)
        })

        afterAll(async () => {
            await userRepository.remove(testUserEntity)
        })
    })

    describe("Test user classic-registration",() => {
        it("should not create an existing user",async () => {
            testUserEntity.id = undefined
            testUserEntity = await userRepository.save(testUserEntity)
            expect(await userAccountService.createUserFromEntity({userEntity: testUserEntity})).toBe(false)
            await userRepository.delete({email: testUserEntity.email})
        })

        it("should create a new account",async () => {
            const clonedUser = Object.assign(new UserEntity(),testUserEntity)

            clonedUser.email = "new_email@email.com"
            clonedUser.id = undefined

            expect(await userAccountService.createUserFromEntity({userEntity: clonedUser})).toBeInstanceOf(UserEntity)
            expect(await userRepository.findOneBy({email: clonedUser.email})).not.toBe(null)
            await userRepository.delete({email: clonedUser.email})
        })
    })

    afterAll(async () => {
        await module.close()
    })
})
