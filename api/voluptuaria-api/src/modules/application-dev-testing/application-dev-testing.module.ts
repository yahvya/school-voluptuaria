import { Module } from "@nestjs/common"
import { TestController } from "./controllers/test.controller"
import { GoogleMapsPlaceModule } from "../google-maps-place/google-maps-place.module"

/**
 * @brief application dev testing
 * @todo remove at the end
 */
@Module({
    controllers: [TestController],
    imports: [GoogleMapsPlaceModule]
})
export class ApplicationDevTestingModule {
}
