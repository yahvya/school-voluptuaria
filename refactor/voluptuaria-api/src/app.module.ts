import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { ToRemoveModule } from "./modules/to-remove/to-remove.module"

/**
 * Application module
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
        ToRemoveModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
