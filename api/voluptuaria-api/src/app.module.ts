import { UserModule } from "./modules/user/user.module"
import { ConfigModule } from "@nestjs/config"
import { LangModule } from "./modules/lang-module/lang.module"
import { Module } from "@nestjs/common"
import { DatabaseModule } from "./modules/database-module/database.module"
import { MailModule } from "./modules/mail-module/mail.module"
import { AppSecurityModule } from "./modules/app-security/app-security.module"
import { UtilsModule } from "./modules/utils/utils.module"
import { TestController } from "./modules/application-dev-testing/controllers/test.controller"

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({ isGlobal: true }),
        LangModule,
        DatabaseModule,
        MailModule,
        AppSecurityModule,
        UtilsModule,
        TestController
    ],
})
export class AppModule {}
