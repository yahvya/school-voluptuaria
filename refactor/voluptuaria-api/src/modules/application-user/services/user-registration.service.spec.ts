import { UserRegistrationService } from "./user-registration.service"
import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "../../../app.module"
import { ApplicationUserModule } from "../application-user.module"
import { UserEntity, UserGender } from "../../database/entities/user.entity"
import { Repository } from "typeorm"
import { getRepositoryToken } from "@nestjs/typeorm"
import { UserClassicRegistrationRequestDto } from "../data-contracts/user-classic-registration-request.dto"
import { UserClassicRegistrationResponseDto } from "../data-contracts/user-classic-registration-response.dto"
import { MailerService } from "@nestjs-modules/mailer"

describe("User registration service test", () => {
    let userRegistrationService:UserRegistrationService
    let app: TestingModule
    let testUserEntity: UserEntity
    let userRepository: Repository<UserEntity>
    let mailServiceMock

    beforeAll(async () => {
        mailServiceMock = {
            sendMail: jest.fn()
        }

        app = await Test.createTestingModule({
            imports: [AppModule,ApplicationUserModule]
        })
            .overrideProvider(MailerService)
            .useValue(mailServiceMock)
            .compile()

        userRegistrationService = app.get(UserRegistrationService)
        userRepository = app.get(getRepositoryToken(UserEntity))

        testUserEntity = new UserEntity()
        testUserEntity.email = "testuser@email.com"
        testUserEntity.password = "test password"
        testUserEntity.gender = UserGender.MAN
        testUserEntity.userName = "test user name"
        testUserEntity.userFirstname = "test user firstname"

        await app.init()
    })

    describe("Test user classic registration initialisation",() => {
        beforeEach(async () => {
            testUserEntity = await userRepository.save(testUserEntity)
        })

        it("should find an already existing account",async () => {
            await expect(async () => {
                const requestDto = new UserClassicRegistrationRequestDto()
                requestDto.email = testUserEntity.email
                requestDto.password = "a password"
                requestDto.name = "a name"
                requestDto.firstname = "a firstname"

                const result = await userRegistrationService.registerUser({lang: "french",requestDto: requestDto})

                expect(result).toBeInstanceOf(UserClassicRegistrationResponseDto)
                expect(result.error).toBe("error.bad-fields")
                expect(result.confirmationCode).toBe(null)
                expect(result.confirmationCodeIv).toBe(null)
            }).not.toThrow()
        })

        it("should send the confirmation mail",async () => {
            testUserEntity = await userRepository.remove(testUserEntity)

            await expect(async () => {
                const requestDto = new UserClassicRegistrationRequestDto()
                requestDto.email = testUserEntity.email
                requestDto.name = testUserEntity.userName
                requestDto.firstname = testUserEntity.userFirstname
                requestDto.password = testUserEntity.password

                const result = await userRegistrationService.registerUser({lang: "french",requestDto: requestDto})

                expect(mailServiceMock.sendMail).toHaveBeenCalledTimes(4000)
                expect(result).toBeInstanceOf(UserClassicRegistrationResponseDto)
                expect(result.error).toBe(null)
                expect(result.confirmationCode).not.toBe(null)
                expect(result.confirmationCodeIv).not.toBe(null)
            }).not.toThrow()
        })

        afterEach(async () => {
            try{
                testUserEntity = await userRepository.remove(testUserEntity)
            }
            catch (_){}
        })
    })

    afterAll(async () => {
        await app.close()
    })
})
