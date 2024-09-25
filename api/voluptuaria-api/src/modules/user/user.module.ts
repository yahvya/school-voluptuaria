import {Module} from "@nestjs/common";
import {UserRegistrationService} from "./services/user-registration-service";
import {UserLoginController} from "./controllers/user-login-controller";
import {UserRegistrationController} from "./controllers/user-registration-controller";
import {UserLoginService} from "./services/user-login.service";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";

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
        })
    ],
    providers: [
        UserRegistrationService,
        UserLoginService
    ],
    controllers: [
        UserLoginController,
        UserRegistrationController
    ]
})
export class UserModule{
}