import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { GoogleAuthService } from "./services/google-auth.service"

/**
 * Application google auth integration module
 */
@Module({
    imports: [PassportModule.register({ defaultStrategy: "google" })],
    providers: [GoogleAuthService],
    exports: [GoogleAuthService],
})
export class GoogleAuthModule {}
