import { Global, Module } from "@nestjs/common"
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { ConfigService } from "@nestjs/config"

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (
                configService: ConfigService,
            ): TypeOrmModuleOptions => {
                const options = {
                    type: configService.getOrThrow("DATABASE_TYPE"),
                    host: configService.getOrThrow("DATABASE_HOST"),
                    port: configService.getOrThrow("DATABASE_PORT"),
                    username: configService.getOrThrow("DATABASE_USER"),
                    password: configService.getOrThrow("DATABASE_PASSWORD"),
                    database: configService.getOrThrow("DATABASE_NAME"),
                    synchronize:
                        configService.getOrThrow("DATABASE_SYNC") === "true",
                    autoLoadEntities: true,
                }

                return options
            },
        }),
    ],
})
@Global()
export class DatabaseModule {}
