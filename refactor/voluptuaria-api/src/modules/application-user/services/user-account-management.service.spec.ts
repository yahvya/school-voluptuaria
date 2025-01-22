import { UserAccountManagementService } from "./user-account-management.service"
import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "../../../app.module"
import { ApplicationUserModule } from "../application-user.module"
import { UserEntity, UserGender } from "../../database/entities/user.entity"
import { Repository } from "typeorm"
import { getRepositoryToken } from "@nestjs/typeorm"
import { UserLoginService } from "./user-login.service"
import { UserProfileUpdateRequestDto } from "../data-contracts/user-account-management/user-profile-update-request.dto"
import { UserLoginResponseDto } from "../data-contracts/login/user-login-response.dto"

describe("Test user account management service",() => {
    let userAccountManagementService: UserAccountManagementService
    let app: TestingModule
    let testUserEntity: UserEntity
    let authenticationToken:string
    let userRepository: Repository<UserEntity>

    beforeAll(async () => {
        app = await Test.createTestingModule({
            imports: [AppModule,ApplicationUserModule]
        }).compile()

        userAccountManagementService = app.get(UserAccountManagementService)
        userRepository = app.get(getRepositoryToken(UserEntity))

        testUserEntity = new UserEntity()
        testUserEntity.email = "test@gmail.com"
        testUserEntity.password = "pwd"
        testUserEntity.userName = "name"
        testUserEntity.userFirstname = "firstname"
        testUserEntity = await userRepository.save(testUserEntity)

        authenticationToken = app.get(UserLoginService).buildTokenFromUserEntity({userEntity: testUserEntity})

        await app.init()
    })

    describe("Test account data update",() => {
        it("should update the password",async () => {
            await expect(async () => {
                const requestDto = new UserProfileUpdateRequestDto()
                requestDto.password = "new pdf"

                const result = await userAccountManagementService.updateUserAccountProfileData({requestDto: requestDto,authenticationToken: authenticationToken})

                expect(result).toBeInstanceOf(UserLoginResponseDto)
                expect(result.error).toBe(null)
                expect(result.authenticationToken).not.toBe(null)

                const foundedUser = await userRepository.findOneBy({email: testUserEntity.email})

                expect(foundedUser).not.toBe(null)
                expect(foundedUser.password).not.toBe(testUserEntity.password)
            }).not.toThrow()
        })

        it("should update the birthdate",async () => {
                const requestDto = new UserProfileUpdateRequestDto()
                requestDto.birthdate = new Date()

                const result = await userAccountManagementService.updateUserAccountProfileData({requestDto: requestDto,authenticationToken: authenticationToken})

                expect(result).toBeInstanceOf(UserLoginResponseDto)
                expect(result.error).toBe(null)
                expect(result.authenticationToken).not.toBe(null)

                const foundedUser = await userRepository.findOneBy({email: testUserEntity.email})

                expect(foundedUser).not.toBe(null)
                expect(foundedUser.birthdate).not.toBe(null)
        })

        it("should update the phone number",async () => {
            await expect(async () => {
                const requestDto = new UserProfileUpdateRequestDto()
                requestDto.phoneNumber = "987654"

                const result = await userAccountManagementService.updateUserAccountProfileData({requestDto: requestDto,authenticationToken: authenticationToken})

                expect(result).toBeInstanceOf(UserLoginResponseDto)
                expect(result.error).toBe(null)
                expect(result.authenticationToken).not.toBe(null)

                const foundedUser = await userRepository.findOneBy({email: testUserEntity.email})

                expect(foundedUser).not.toBe(null)
                expect(foundedUser.phoneNumber).not.toBe(requestDto.phoneNumber)
            }).not.toThrow()
        })

        it("should update the gender",async () => {
            await expect(async () => {
                const requestDto = new UserProfileUpdateRequestDto()
                requestDto.gender = UserGender.MAN

                const result = await userAccountManagementService.updateUserAccountProfileData({requestDto: requestDto,authenticationToken: authenticationToken})

                expect(result).toBeInstanceOf(UserLoginResponseDto)
                expect(result.error).toBe(null)
                expect(result.authenticationToken).not.toBe(null)

                const foundedUser = await userRepository.findOneBy({email: testUserEntity.email})

                expect(foundedUser).not.toBe(null)
                expect(foundedUser.gender).toBe(UserGender.MAN)
            }).not.toThrow()
        })
    })

    afterAll(async () => {
        try{
            await userRepository.remove(testUserEntity)
        }
        catch (_){}

        await app.close()
    })
})
