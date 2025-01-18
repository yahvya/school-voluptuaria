import { Global, Module } from "@nestjs/common"
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { ConfigService } from "@nestjs/config"

/**
 * Application database module
 */
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
                type: configService.getOrThrow("DATABASE_TYPE"),
                host: configService.getOrThrow("DATABASE_HOST"),
                port: configService.getOrThrow("DATABASE_PORT"),
                username: configService.getOrThrow("DATABASE_USER"),
                password: configService.getOrThrow("DATABASE_PASSWORD"),
                database: configService.getOrThrow("DATABASE_NAME"),
                synchronize: configService.getOrThrow("DATABASE_ENABLE_SYNC") === "true",
                autoLoadEntities: true
            }) as TypeOrmModuleOptions,
        }),
    ],
})
@Global()
export class DatabaseModule {}
