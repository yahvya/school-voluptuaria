import { Global, Module } from "@nestjs/common"
import { EncryptionService } from "./services/encryption.service"
import { HashService } from "./services/hash.service"

/**
 * Application security management module
 */
@Module({
    providers: [EncryptionService, HashService],
    exports: [EncryptionService, HashService],
})
@Global()
export class AppSecurityModule {
}
