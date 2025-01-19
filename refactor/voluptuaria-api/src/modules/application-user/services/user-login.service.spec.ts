import { UserLoginService } from "./user-login.service"
import { Repository } from "typeorm"
import { UserEntity, UserGender } from "../../database/entities/user.entity"
import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "../../../app.module"
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm"
import { HashService } from "../../app-security/services/hash.service"
import { UserLoginRequestDto } from "../data-contracts/user-login-request.dto"
import { UserLoginResponseDto } from "../data-contracts/user-login-response.dto"

describe("Test user login service", () => {
    let userLoginService:UserLoginService
    let userRepository: Repository<UserEntity>
    let testUserEntity:UserEntity
    let realPassword:string
    let module: TestingModule

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [AppModule,TypeOrmModule.forFeature([UserEntity])]
        }).compile()

        userLoginService = module.get(UserLoginService)
        userRepository = module.get(getRepositoryToken(UserEntity))

        testUserEntity = new UserEntity()
        realPassword = "real_password"

        testUserEntity.email = "testemail@email.com"
        testUserEntity.password = await module.get(HashService).hash({toHash: realPassword})
        testUserEntity.gender = UserGender.MAN
        testUserEntity.userName = "test user name"
        testUserEntity.userFirstname = "test user firstname"

        await userRepository.delete({email: testUserEntity.email})
        await userRepository.save(testUserEntity)
    })

    describe("Test login method", () => {
        it("should not recognize the email",async () => {
            const requestDto = new UserLoginRequestDto()
            requestDto.email = "bad_email@email.com"
            requestDto.password = "bad pwd"

            const result = await userLoginService.logUser({requestDto: requestDto})

            expect(result).toBeInstanceOf(UserLoginResponseDto)
            expect(result.error).toBe("error.bad-fields")
            expect(result.authenticationToken).toBe(null)
        })

        it("should recognize the email but not the password",async () => {
            const requestDto = new UserLoginRequestDto()
            requestDto.email = testUserEntity.email
            requestDto.password = "bad pwd"

            const result = await userLoginService.logUser({requestDto: requestDto})

            expect(result).toBeInstanceOf(UserLoginResponseDto)
            expect(result.error).toBe("error.bad-fields")
            expect(result.authenticationToken).toBe(null)
        })

        it("should log the account",async () => {
            const requestDto = new UserLoginRequestDto()
            requestDto.email = testUserEntity.email
            requestDto.password = realPassword

            const result = await userLoginService.logUser({requestDto: requestDto})

            expect(result).toBeInstanceOf(UserLoginResponseDto)
            expect(result.error).toBe(null)
            expect(result.authenticationToken).not.toBe(null)
        })
    })

    afterAll(async () => {
        await userRepository.remove(testUserEntity)
        await module.close()
    })
})
