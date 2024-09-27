import { Global, Module } from "@nestjs/common"
import { LangService } from "./services/lang.service"

/**
 * @brief Lang management module
 */
@Global()
@Module({
    providers: [LangService],
    exports: [LangService],
})
export class LangModule {}
