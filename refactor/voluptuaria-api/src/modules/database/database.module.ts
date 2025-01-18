import { Global, Module } from "@nestjs/common"
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { ConfigService } from "@nestjs/config"
import { UserEntity } from "./entities/user.entity"
import { UserCategoriesLikeStateEntity } from "./entities/user-categories-like-state.entity"
import { SocialProfileEntity } from "./entities/social-profile.entity"
import { RegisteredPlacesEntity } from "./entities/registered-places.entity"
import { PlaceCategoriesEntity } from "./entities/place-categories.entity"
import { UserCommentsEntity } from "./entities/user-comments.entity"
import { TravelRoutesEntity } from "./entities/travel-routes.entity"

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
                entities: [UserEntity,UserCategoriesLikeStateEntity,SocialProfileEntity,RegisteredPlacesEntity,PlaceCategoriesEntity,UserCommentsEntity,TravelRoutesEntity]
            }) as TypeOrmModuleOptions,
        }),
    ],
})
@Global()
export class DatabaseModule {}
