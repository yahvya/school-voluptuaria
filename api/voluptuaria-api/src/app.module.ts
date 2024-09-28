import { UserModule } from "./modules/user/user.module"
import { ConfigModule } from "@nestjs/config"
import { LangModule } from "./modules/lang-module/lang.module"
import { Module } from "@nestjs/common"
import { DatabaseModule } from "./modules/database-module/database.module"
import { MailModule } from "./modules/mail-module/mail.module"
import { AppSecurityModule } from "./modules/app-security/app-security.module"
import { UtilsModule } from "./modules/utils/utils.module"
import { ApplicationDevTestingModule } from "./modules/application-dev-testing/application-dev-testing.module"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "resources/static")
        }),
        UserModule,
        LangModule,
        DatabaseModule,
        MailModule,
        AppSecurityModule,
        UtilsModule,
        ApplicationDevTestingModule,
    ],
})
export class AppModule {}
