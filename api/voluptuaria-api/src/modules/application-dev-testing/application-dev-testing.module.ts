import { Module } from "@nestjs/common"
import { TestController } from "./controllers/test.controller"
import { GoogleMapsPlaceModule } from "../google-maps-place/google-maps-place.module"
import { SearchPlaceModule } from "../search-place/search-place.module"

/**
 * @brief application dev testing
 * @todo remove at the end
 */
@Module({
    controllers: [TestController],
    imports: [GoogleMapsPlaceModule,SearchPlaceModule]
})
export class ApplicationDevTestingModule {
}
