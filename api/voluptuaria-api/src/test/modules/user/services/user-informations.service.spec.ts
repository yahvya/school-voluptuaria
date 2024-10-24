import { UserLoginService } from "../../../../modules/user/services/user-login.service"
import { Test } from "@nestjs/testing"
import { UserModule } from "../../../../modules/user/user.module"
import { DatabaseModule } from "../../../../modules/database-module/database.module"
import {
    Gender,
    UserEntity,
} from "../../../../modules/database-module/entities/user.entity"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { AppSecurityModule } from "../../../../modules/app-security/app-security.module"
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm"
import { JwtModule } from "@nestjs/jwt"
import { MailModule } from "../../../../modules/mail-module/mail.module"
import { LangModule } from "../../../../modules/lang-module/lang.module"
import { UtilsModule } from "../../../../modules/utils/utils.module"
import { Repository } from "typeorm"
import { HashService } from "../../../../modules/app-security/services/hash.service"
import {UserInformationsService} from "../../../../modules/user/services/user-informations.service";

describe("User.UserInformationService", () => {
    let userLoginService: UserLoginService
    let userInformationService : UserInformationsService
    let testUserEntity: UserEntity
    let testUserRepository: Repository<UserEntity>

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                UserModule,
                DatabaseModule,
                ConfigModule.forRoot({ isGlobal: true }),
                AppSecurityModule,
                TypeOrmModule.forFeature([UserEntity]),
                JwtModule.registerAsync({
                    inject: [ConfigService],
                    imports: [ConfigModule],
                    useFactory: async (configService: ConfigService) => ({
                        secret: configService.getOrThrow("JWT_SECRET"),
                        signOptions: {
                            expiresIn:
                                configService.getOrThrow("JWT_EXPIRES_IN"),
                        },
                    }),
                }),
                MailModule,
                LangModule,
                UtilsModule,
                DatabaseModule,
            ],
        }).compile()

        const hashService: HashService = moduleRef.get<HashService>(HashService)

        testUserRepository = moduleRef.get<Repository<UserEntity>>(
            getRepositoryToken(UserEntity),
        )

        testUserEntity = new UserEntity()
        testUserEntity.gender = Gender.UNDEFINED
        testUserEntity.name = "not exist"
        testUserEntity.firstName = "not exist"
        testUserEntity.email = "not_exist@email.com"
        testUserEntity.password = await hashService.hash({
            toHash: "password",
            salt: 10,
        })

        await testUserRepository.save(testUserEntity)

        userLoginService = moduleRef.get<UserLoginService>(UserLoginService)

        userInformationService = moduleRef.get<UserInformationsService>(UserInformationsService)
    })

    describe("update password", () => {

        it("should update the password", async () => {
            const editResponse = await userInformationService.editPassword({
                editPasswordData: {
                    old_password : "password",
                    new_password : "new_password",
                    confirm_new_password : "new_password",
                },
            })

            expect(editResponse.errorMessage).toBeNull()


            const loginResponse = await userLoginService.login({
                userLoginDatas: {
                    email: testUserEntity.email,
                    password: "new_password",
                },
            })

            expect(loginResponse.errorMessage).toBeNull()


        })

        it("should return the password isn't equal with the new password", async () => {
            const response = await userInformationService.editPassword({
                editPasswordData: {
                    old_password : "password",
                    new_password : "new_password",
                    confirm_new_password : "password",
                },
            })

            expect(response.errorMessage).toBe("error.matching-password")

        })

    })


    afterAll(async () => {
        await testUserRepository.remove(testUserEntity)
    })
})
