import { GoogleMapsPlaceService } from "./google-maps-place.service"
import { Test } from "@nestjs/testing"
import { GoogleMapsPlaceModule } from "../google-maps-place.module"
import { AppModule } from "../../../app.module"

describe("Test google maps place api service",() => {
    let googleMapPlaceService:GoogleMapsPlaceService

    beforeAll(async () => {
        const app = await Test.createTestingModule({
            imports: [AppModule,GoogleMapsPlaceModule]
        }).compile()

        googleMapPlaceService = app.get(GoogleMapsPlaceService)
    })

    describe("Test text search",() => {
        it("should find elements",async () => {
            await expect(async () => {
                await googleMapPlaceService.loadUserTextSearch({search: "restaurant",lang: "french",minRating: 1})
            }).not.toThrow()
        })
    })
})
