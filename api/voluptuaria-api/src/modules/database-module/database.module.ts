import { Global, Module } from "@nestjs/common"
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { UserEntity } from "./entities/user.entity"
import { PlacesEntity } from "./entities/places.entity"
import { SocialProfileEntity } from "./entities/social-profile.entity"
import { TravelRoutesEntity } from "./entities/travel-routes.entity"
import { VisitedPlacesEntity } from "./entities/visited-places.entity"
import { WishLists } from "./entities/wish-list.entity"

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService:ConfigService):TypeOrmModuleOptions => {
                const options = {
                    type: configService.getOrThrow("DATABASE_TYPE"),
                    host: configService.getOrThrow("DATABASE_HOST"),
                    port: configService.getOrThrow("DATABASE_PORT"),
                    username: configService.getOrThrow("DATABASE_USER"),
                    password: configService.getOrThrow("DATABASE_PASSWORD"),
                    database: configService.getOrThrow("DATABASE_NAME"),
                    synchronize: configService.getOrThrow("DATABASE_SYNC") === "true",
                    entities: [
                        UserEntity,
                        PlacesEntity,
                        SocialProfileEntity,
                        TravelRoutesEntity,
                        PlacesEntity,
                        VisitedPlacesEntity,
                        WishLists
                    ]
                }

                return options
            }
        })
    ]
})
@Global()
export class DatabaseModule{
}