import { Global, Module } from "@nestjs/common"
import { EncryptService } from "./services/encrypt.service"
import { HashService } from "./services/hash.service"

/**
 * @brief application security management module
 */
@Module({
    providers: [EncryptService, HashService],
    exports: [EncryptService, HashService],
})
@Global()
export class AppSecurityModule {}
