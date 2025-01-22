import { OpenweathermapService } from "./openweathermap.service"
import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "../../../app.module"
import { OpenweathermapModule } from "../openweathermap.module"
import { OpenweathermapDto } from "../data-contracts/openweathermap.dto"

describe("Test openweathermap service",() => {
    let openweathermapService: OpenweathermapService
    let app:TestingModule

    beforeAll(async () => {
        app = await Test.createTestingModule({
            imports: [AppModule,OpenweathermapModule]
        }).compile()

        openweathermapService = app.get(OpenweathermapService)
        await app.init()
    })

    describe("Test fetching data",() => {
        it("should provide data",async () => {
            const result = await openweathermapService.getWeatherDataOf({longitude: "2.3522",latitude: "48.8566",lang: "french"})

            expect(result).not.toBe(null)
            expect(result).not.toBeInstanceOf(OpenweathermapDto)
        })

        afterAll(async () => {
            await app.close()
        })
    })
})
