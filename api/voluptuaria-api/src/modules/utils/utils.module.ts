import { Global, Module } from "@nestjs/common"
import { StringService } from "./services/string.service"

@Module({
    providers: [StringService],
    exports: [StringService],
})
@Global()
export class UtilsModule {
}
