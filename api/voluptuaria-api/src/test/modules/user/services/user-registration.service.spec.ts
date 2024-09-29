import { UserRegistrationService } from "../../../../modules/user/services/user-registration.service"
import { UserRegistrationDatas } from "../../../../modules/user/data-contracts/user-registration/user-registration.datas"
import { Test } from "@nestjs/testing"
import { UserModule } from "../../../../modules/user/user.module"
import { DatabaseModule } from "../../../../modules/database-module/database.module"
import { Repository } from "typeorm"
import {
    Gender,
    UserEntity,
} from "../../../../modules/database-module/entities/user.entity"
import { ConfigModule } from "@nestjs/config"
import { MailModule } from "../../../../modules/mail-module/mail.module"
import { LangModule } from "../../../../modules/lang-module/lang.module"
import { AppSecurityModule } from "../../../../modules/app-security/app-security.module"
import { UtilsModule } from "../../../../modules/utils/utils.module"
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm"
import { HashService } from "../../../../modules/app-security/services/hash.service"

describe("User.UserRegistrationService", () => {
    let userRegistrationService: UserRegistrationService
    let testUserDatas: UserRegistrationDatas
    let testUserEntity: UserEntity
    let userRepository: Repository<UserEntity>

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                UserModule,
                DatabaseModule,
                ConfigModule.forRoot({ isGlobal: true }),
                MailModule,
                LangModule,
                AppSecurityModule,
                UtilsModule,
                TypeOrmModule.forFeature([UserEntity]),
            ],
        }).compile()

        userRegistrationService = moduleRef.get<UserRegistrationService>(
            UserRegistrationService,
        )
        userRepository = moduleRef.get<Repository<UserEntity>>(
            getRepositoryToken(UserEntity),
        )

        const hashService = moduleRef.get<HashService>(HashService)

        testUserDatas = {
            firstname: "svel",
            name: "zvheer",
            email: "voluptuaria.test@test.com",
            password: "voluptuaria_test",
        }
        testUserEntity = new UserEntity()

        testUserEntity.firstName = testUserDatas.firstname
        testUserEntity.name = testUserDatas.name
        testUserEntity.email = testUserDatas.email
        testUserEntity.password = await hashService.hash({
            toHash: testUserDatas.password,
            salt: 10,
        })
        testUserEntity.gender = Gender.UNDEFINED

        await userRepository.save(testUserEntity)
    })

    it("should found the test user", async () => {
        const foundedUser = await userRepository.findOneBy({
            email: testUserDatas.email,
        })
        expect(foundedUser).not.toBeNull()
    })

    describe("register", () => {
        it("should not accept the initialization", async () => {
            const result = await userRegistrationService.register({
                userRegistrationDatas: testUserDatas,
                lang: "french",
            })

            expect(result.errorMessage).toBe("error.account-already-exist")
        })

        it("should send the confirmation mail", async () => {
            const result = await userRegistrationService.register({
                lang: "french",
                userRegistrationDatas: {
                    email: "non_existuser@gmail.com",
                    firstname: "non exist",
                    name: "non exist",
                    password: "motDEpasse11@@",
                },
            })

            expect(result.confirmationCode).not.toBeNull()
        })
    })

    afterAll(async () => {
        await userRepository.remove(testUserEntity)
    })
})
