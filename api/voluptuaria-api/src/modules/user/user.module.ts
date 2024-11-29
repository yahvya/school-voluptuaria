import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import {  ConfigService } from "@nestjs/config"
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
import { TravelRouteController } from "./controllers/travel-route.controllers"
import { RecommendationModule } from "../recommendation/recommendation.module"

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const options = {
                    secret: configService.getOrThrow<string>("JWT_SECRET"),
                    signOptions: {
                        expiresIn: configService.getOrThrow("JWT_EXPIRES_IN"),
                    }
                }

                return options
            }
        }),
        TypeOrmModule.forFeature([UserEntity]),
        GoogleAuthModule,
        RecommendationModule
    ],
    providers: [
        UserRegistrationService,
        UserLoginService,
        ForgotPasswordService,
        UserInformationsService,
    ],
    exports: [
        UserLoginService
    ],
    controllers: [
        UserLoginController,
        UserRegistrationController,
        UserInformationsController,
        TravelRouteController
    ],
})
export class UserModule {
}
