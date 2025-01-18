import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from "../database/entities/user.entity"
import { UserAccountService } from "./services/user-account.service"
import { JwtModule, JwtModuleAsyncOptions } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"

/**
 * Application user module
 */
@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>("JWT_SECRET"),
                signOptions: {
                    expiresIn: configService.getOrThrow("JWT_EXPIRES_IN"),
                }
            } as JwtModuleAsyncOptions)
        }),
    ],
    providers: [UserAccountService],
    exports: [UserAccountService]
})
export class ApplicationUserModule{}
