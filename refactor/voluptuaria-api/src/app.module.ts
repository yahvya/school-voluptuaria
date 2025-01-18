import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { DatabaseModule } from './modules/database/database.module';
import { ToRemoveModule } from "./modules/to-remove/to-remove.module"
import { UtilitiesModule } from "./modules/utils/utilities.module"
import { AppSecurityModule } from "./modules/app-security/app-security.module"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"
import { JwtModule, JwtModuleAsyncOptions } from "@nestjs/jwt"

/**
 * Application module
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "resources/static"),
        }),
        JwtModule.registerAsync({
            global: true,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>("JWT_SECRET")
            } as JwtModuleAsyncOptions)
        }),
        DatabaseModule,
        ToRemoveModule,
        UtilitiesModule,
        AppSecurityModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
