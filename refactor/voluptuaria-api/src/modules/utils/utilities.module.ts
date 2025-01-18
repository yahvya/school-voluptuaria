import { Global, Module } from "@nestjs/common"
import { StringService } from "./services/string.service"

/**
 * Application utilities module
 */
@Module({
    providers: [StringService],
    exports: [StringService],
})
@Global()
export class UtilitiesModule {
}
