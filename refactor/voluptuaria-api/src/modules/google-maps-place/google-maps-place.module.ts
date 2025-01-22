import { Module } from "@nestjs/common"
import { GoogleMapsPlaceService } from "./services/google-maps-place.service"
import { LangModule } from "../lang-module/lang.module"

@Module({
    imports: [LangModule],
    exports: [GoogleMapsPlaceService],
    providers: [GoogleMapsPlaceService],
})
export class GoogleMapsPlaceModule{}
