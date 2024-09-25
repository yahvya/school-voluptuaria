import {Module} from "@nestjs/common";
import {UserRegistrationService} from "./services/user-registration-service";
import {UserLoginController} from "./controllers/user-login-controller";
import {UserRegistrationController} from "./controllers/user-registration-controller";
import {UserLoginService} from "./services/user-login.service";
import {JwtModule} from "@nestjs/jwt";
import {EnvConfigService} from "../../core/configs/env-config-service";
import {ConfigModule} from "../../core/configs/config.module";

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [EnvConfigService],
            imports: [ConfigModule],
            useFactory: async (configService: EnvConfigService) => ({
                secret: configService.jwtSecret,
                signOptions: {
                    expiresIn: configService.jwtExpired,
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