import { Module } from "@nestjs/common"
import { JwtModule, JwtService } from "@nestjs/jwt"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { UserRegistrationService } from "./services/user-registration.service"
import { UserLoginService } from "./services/user-login.service"
import { UserLoginController } from "./controllers/user-login.controller"
import { UserRegistrationController } from "./controllers/user-registration.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from "../database-module/entities/user.entity"
import { ForgotPasswordService } from "./services/forgot-password.service"
import { GoogleAuthModule } from "../google-auth-module/google-auth.module"
import { UserInformationsService } from "./services/user-informations.service"
import { UserInformationsController } from "./controllers/user-informations.controller"

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.getOrThrow("JWT_SECRET"),
                signOptions: {
                    expiresIn: configService.getOrThrow("JWT_EXPIRES_IN"),
                },
            }),
        }),
        TypeOrmModule.forFeature([UserEntity]),
        GoogleAuthModule,
    ],
    providers: [
        UserRegistrationService,
        UserLoginService,
        JwtService,
        ForgotPasswordService,
        UserInformationsService,
    ],
    controllers: [
        UserLoginController,
        UserRegistrationController,
        UserInformationsController,
    ],
})
export class UserModule {
}
