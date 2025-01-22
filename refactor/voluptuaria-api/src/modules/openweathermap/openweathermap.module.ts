import { Module } from "@nestjs/common"
import { OpenweathermapService } from "./services/openweathermap.service"
import { LangModule } from "../lang-module/lang.module"

/**
 * Openweathermap api module
 */
@Module({
    imports: [LangModule],
    exports: [OpenweathermapService],
    providers: [OpenweathermapService]
})
export class OpenweathermapModule{}
