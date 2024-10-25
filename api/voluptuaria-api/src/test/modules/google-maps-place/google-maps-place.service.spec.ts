import { GoogleMapsPlaceService } from "../../../modules/google-maps-place/services/google-maps-place.service"
import { Test } from "@nestjs/testing"
import { ConfigModule } from "@nestjs/config"
import { GoogleMapsPlaceModule } from "../../../modules/google-maps-place/google-maps-place.module"
import { LangModule } from "../../../modules/lang-module/lang.module"

describe("Google map place service",() => {
    let googleMapsPlaceService: GoogleMapsPlaceService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({ isGlobal: true }),GoogleMapsPlaceModule,
                LangModule
            ]
        }).compile()

        googleMapsPlaceService = moduleRef.get(GoogleMapsPlaceService)
    })

    describe("test by text search",() => {
        test.each([
            "Restaurants",
            "Musée à paris",
            "Parcs d'attractions",
            "Fleuves"
        ])
        ("should provide maps datas",async (search) => {
            expect(async () => {
                const placeDatas = await googleMapsPlaceService.getPlacesDatasBySearch({
                    search: search,
                    lang: "french",
                    minRating: 1
                })
            }).not.toThrow()
        })
    })
})
