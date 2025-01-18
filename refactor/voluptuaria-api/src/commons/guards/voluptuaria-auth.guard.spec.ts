import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { AppModule } from "../../app.module"
import * as request from "supertest"
import { ConfigService } from "@nestjs/config"
import { EncryptionService } from "../../modules/app-security/services/encryption.service"

describe("Test of the voluptuaria auth guard",() => {
    let application:INestApplication
    let configService:ConfigService
    let encryptionService: EncryptionService

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        application = module.createNestApplication()

        configService = application.get(ConfigService)
        encryptionService = application.get(EncryptionService)

        await application.init()
    })

    describe("Test guard",() => {
        it("should not allow the request",async () => {
            const response = await request(application.getHttpServer())
                .get("/test/voluptuaria-guard")

            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty("error")
        })

        it("should allow the request",async () => {
            const encryptedToken = await encryptionService.encrypt({
                toEncrypt: configService.get("SECURITY_VOLUPTUARIA_TOKEN_CLEAR_VALUE"),
                secretKey: configService.get("SECURITY_VOLUPTUARIA_TOKEN_SECRET")
            })

            const response = await request(application.getHttpServer())
                .get("/test/voluptuaria-guard")
                .set(configService.get("SECURITY_VOLUPTUARIA_TOKEN_HEADER_KEY"),encryptedToken.encryptionResult)
                .set(configService.get("SECURITY_VOLUPTUARIA_TOKEN_IV_KEY"),encryptedToken.iv)

            expect(response.status).toBe(200)
        })
    })

    afterAll(async () => {
        await application.close()
    })
})
