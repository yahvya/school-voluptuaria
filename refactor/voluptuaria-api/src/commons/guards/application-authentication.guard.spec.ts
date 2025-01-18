import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { AppModule } from "../../app.module"
import * as request from "supertest"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"

describe("Test of the application authentication guard", () => {
    let application:INestApplication
    let jwtService: JwtService
    let configService: ConfigService

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        application = module.createNestApplication()

        jwtService = application.get(JwtService)
        configService = application.get(ConfigService)

        await application.init()
    })

    describe("Test guard", () => {
        it("should not allow the request",async () => {
            const response = await request(application.getHttpServer())
                .get("/test/authentication-guard")

            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty("error")
        })

        it("should allow the request",async () => {
            const validJwtToken = jwtService.sign({"tokenContent": true},{expiresIn: 4000})

            const response = await request(application.getHttpServer())
                .get("/test/authentication-guard")
                .set(configService.get("SECURITY_AUTHENTICATION_TOKEN_HEADER_KEY"),validJwtToken)

            expect(response.status).toBe(200)
        })
    })

    afterAll(async () => {
        await application.close()
    })
})
