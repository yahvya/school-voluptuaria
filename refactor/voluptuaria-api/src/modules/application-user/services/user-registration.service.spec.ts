import { UserRegistrationService } from "./user-registration.service"
import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "../../../app.module"
import { ApplicationUserModule } from "../application-user.module"
import { UserEntity, UserGender } from "../../database/entities/user.entity"
import { Repository } from "typeorm"
import { getRepositoryToken } from "@nestjs/typeorm"
import { UserClassicRegistrationRequestDto } from "../data-contracts/classic-registration/user-classic-registration-request.dto"
import { UserClassicRegistrationResponseDto } from "../data-contracts/classic-registration/user-classic-registration-response.dto"
import { MailerService } from "@nestjs-modules/mailer"
import {
    UserClassicRegistrationConfirmationRequestDto
} from "../data-contracts/classic-registration/user-classic-registration-confirmation-request.dto"
import { UserLoginResponseDto } from "../data-contracts/login/user-login-response.dto"
import { StringService } from "../../utils/services/string.service"
import { UserGoogleRegistrationInitRequestDto } from "../data-contracts/google-registration/user-google-registration-init-request.dto"
import { UserGoogleRegistrationInitResponseDto } from "../data-contracts/google-registration/user-google-registration-init-response.dto"
import { ConfigService } from "@nestjs/config"

describe("User classic-registration service test", () => {
    let userRegistrationService:UserRegistrationService
    let app: TestingModule
    let configService: ConfigService
    let testUserEntity: UserEntity
    let userRepository: Repository<UserEntity>
    let mailServiceMock
    let stringServiceMock
    const fixedRandom = "fixed_content"

    beforeAll(async () => {
        // mocks definition
        mailServiceMock = {
            sendMail: jest.fn()
        }

        stringServiceMock = {
            random: jest.fn(() => fixedRandom)
        }

        app = await Test.createTestingModule({
            imports: [AppModule,ApplicationUserModule]
        })
            .overrideProvider(MailerService)
            .useValue(mailServiceMock)
            .overrideProvider(StringService)
            .useValue(stringServiceMock)
            .compile()

        userRegistrationService = app.get(UserRegistrationService)
        configService = app.get(ConfigService)
        userRepository = app.get(getRepositoryToken(UserEntity))

        testUserEntity = new UserEntity()
        testUserEntity.email = "testuser@email.com"
        testUserEntity.password = "test password"
        testUserEntity.gender = UserGender.MAN
        testUserEntity.userName = "test user name"
        testUserEntity.userFirstname = "test user firstname"

        await app.init()
    })

    describe("Test user classic classic-registration initialisation",() => {
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

                const result = await userRegistrationService.classicallyRegisterUser({lang: "french",requestDto: requestDto})

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

                const result = await userRegistrationService.classicallyRegisterUser({lang: "french",requestDto: requestDto})

                expect(mailServiceMock.sendMail).toHaveBeenCalled()
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

            jest.resetAllMocks()
        })
    })

    describe("Test user classic classic-registration confirmation",() => {
        it("should find invalid codes",async () => {
            await expect(async () => {
                let requestDto = new UserClassicRegistrationConfirmationRequestDto()

                requestDto.email = "email@gmail.com"
                requestDto.password = "pwd"
                requestDto.name = "test name"
                requestDto.firstname = "test firstname"
                requestDto.providedConfirmationCode = "bad code"
                requestDto.providedConfirmationCode = "bad iv"
                requestDto.encryptedConfirmationCode = "bad iv"

                const result = await userRegistrationService.classicallyConfirmUserRegistration({requestDto: requestDto})

                expect(result).toBeInstanceOf(UserLoginResponseDto)
                expect(result.error).toBe("error.bad-confirmation-code")
                expect(result.authenticationToken).toBe(null)
            }).not.toThrow()
        })

        it("should validate the classic-registration",async () => {
            await expect(async () => {
                const initRequestDto = new UserClassicRegistrationRequestDto()

                initRequestDto.name = "test name"
                initRequestDto.firstname = "test firstname"
                initRequestDto.email = "email@gmail.com"
                initRequestDto.password = "test pwd"

                const initResult = await userRegistrationService.classicallyRegisterUser({lang: "french",requestDto: initRequestDto})

                const confirmationRequestDto = new UserClassicRegistrationConfirmationRequestDto()
                confirmationRequestDto.email = initRequestDto.email
                confirmationRequestDto.password = initRequestDto.password
                confirmationRequestDto.name = initRequestDto.name
                confirmationRequestDto.firstname = initRequestDto.firstname
                confirmationRequestDto.encryptedConfirmationCode = initResult.confirmationCode
                confirmationRequestDto.providedConfirmationCode = fixedRandom
                confirmationRequestDto.confirmationIv = initResult.confirmationCodeIv

                const result = await userRegistrationService.classicallyConfirmUserRegistration({requestDto: confirmationRequestDto})

                expect(result).toBeInstanceOf(UserLoginResponseDto)
                expect(result.authenticationToken).not.toBe(null)
                expect(result.error).toBe(null)

                // check insertion in db
                const createdUserFromDb = await userRepository.findOneBy({email: initRequestDto.email})

                expect(createdUserFromDb).toBeInstanceOf(UserEntity)

                await userRepository.remove(createdUserFromDb)
            }).not.toThrow()
        })
    })

    describe("Test user google classic-registration initialisation",() => {
        it("should refuse init due to bad provided link",async () => {
            await expect(async () => {
                const requestDto = new UserGoogleRegistrationInitRequestDto()
                requestDto.redirectUri = "bad_uri"

                const result = await userRegistrationService.initGoogleRegistration({requestDto: requestDto})

                expect(result).toBeInstanceOf(UserGoogleRegistrationInitResponseDto)
                expect(result.error).toBe("error.bad-fields")
                expect(result.link).toBe(null)
            }).not.toThrow()
        })

        it("should refuse init due to bad provided link",async () => {
            await expect(async () => {
                const requestDto = new UserGoogleRegistrationInitRequestDto()
                requestDto.redirectUri = configService.getOrThrow("API_GOOGLE_CALLBACK_URL")

                const result = await userRegistrationService.initGoogleRegistration({requestDto: requestDto})

                expect(result).toBeInstanceOf(UserGoogleRegistrationInitResponseDto)
                expect(result.error).toBe(null)
                expect(result.link).not.toBe(null)
            }).not.toThrow()
        })
    })

    afterAll(async () => {
        await app.close()
    })
})
