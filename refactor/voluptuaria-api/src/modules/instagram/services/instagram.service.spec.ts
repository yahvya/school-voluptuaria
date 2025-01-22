import { InstagramService } from "./instagram.service"
import { Test } from "@nestjs/testing"
import { InstagramModule } from "../instagram.module"
import { AppModule } from "../../../app.module"

describe("Test instagram service",() => {
    let instagramService: InstagramService

    beforeAll(async () => {
        const app = await Test.createTestingModule({
            imports: [AppModule,InstagramModule]
        }).compile()

        instagramService = app.get(InstagramService)
    })
})
