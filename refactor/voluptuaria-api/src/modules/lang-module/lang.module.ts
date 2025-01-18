import { Global, Module } from "@nestjs/common"
import { LangService } from "./services/lang.service"

/**
 * Application lang management module
 */
@Module({
    providers: [LangService],
    exports: [LangService],
})
export class LangModule {
}
