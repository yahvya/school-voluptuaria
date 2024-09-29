import { ForgotPasswordService } from "../../../../modules/user/services/forgot-password.service"
import { Test } from "@nestjs/testing"
import { UserModule } from "../../../../modules/user/user.module"
import { LangModule } from "../../../../modules/lang-module/lang.module"
import { AppSecurityModule } from "../../../../modules/app-security/app-security.module"
import { ConfigModule } from "@nestjs/config"
import { UtilsModule } from "../../../../modules/utils/utils.module"
import { MailModule } from "../../../../modules/mail-module/mail.module"
import { DatabaseModule } from "../../../../modules/database-module/database.module"
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm"
import { Gender, UserEntity } from "../../../../modules/database-module/entities/user.entity"
import { Repository } from "typeorm"
import { HashService } from "../../../../modules/app-security/services/hash.service"

describe("User.ForgotPasswordService",() => {
    let forgotPasswordService:ForgotPasswordService
    let testUserEntity:UserEntity
    let testUserRepository:Repository<UserEntity>

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                UserModule,
                LangModule,
                AppSecurityModule,
                ConfigModule.forRoot({isGlobal: true}),
                UtilsModule,
                MailModule,
                DatabaseModule,
                TypeOrmModule.forFeature([UserEntity])
            ]
        }).compile()

        forgotPasswordService = moduleRef.get<ForgotPasswordService>(ForgotPasswordService)
        testUserRepository = moduleRef.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
        const hashService:HashService = moduleRef.get<HashService>(HashService)

        testUserEntity = new UserEntity()

        testUserEntity.email = "test_user@test.com"
        testUserEntity.name = "test user"
        testUserEntity.firstName = "tester user"
        testUserEntity.gender = Gender.UNDEFINED
        testUserEntity.password = await hashService.hash({
            toHash: "password",
            salt: 10
        })

        await testUserRepository.save(testUserEntity)
    })

    describe("init",() => {
        it("should return not exist message",async () => {
            const result = await forgotPasswordService.init({
                forgotPasswordDatas: {
                    email: "not_exist_@exist.com"
                },
                lang: "french"
            })

            expect(result.errorMessage).toBe("error.unrecognized-email-password")
        })

        it("should send confirmation mail",async () => {
            const result = await forgotPasswordService.init({
                forgotPasswordDatas: {
                    email: testUserEntity.email
                },
                lang: "french"
            })

            expect(result.confirmationCode).not.toBeNull()
        })
    })

    afterAll(async () => {
        await testUserRepository.remove(testUserEntity)
    })
})
