import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { ToRemoveModule } from "./modules/to-remove/to-remove.module"
import { UtilitiesModule } from "./modules/utils/utilities.module"
import { AppSecurityModule } from "./modules/app-security/app-security.module"

/**
 * Application module
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
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
