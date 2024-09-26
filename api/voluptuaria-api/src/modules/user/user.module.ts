import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserRegistrationService} from "./services/user-registration.service";
import {UserLoginService} from "./services/user-login.service";
import {UserLoginController} from "./controllers/user-login.controller";
import {UserRegistrationController} from "./controllers/user-registration.controller";
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from "../database-module/entities/user.entity"

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
        TypeOrmModule.forFeature([UserEntity])
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