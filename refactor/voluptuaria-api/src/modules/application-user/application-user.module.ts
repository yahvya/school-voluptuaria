import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from "../database/entities/user.entity"
import { UserAccountService } from "./services/user-account.service"
import { UserLoginService } from "./services/user-login.service"
import { UserLoginController } from "./controllers/user-login.controller"
import { UserRegistrationController } from "./controllers/user-registration.controller"
import { UserRegistrationService } from "./services/user-registration.service"
import { LangModule } from "../lang-module/lang.module"

/**
 * Application user module
 */
@Module({
    controllers: [UserLoginController,UserRegistrationController],
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        LangModule
    ],
    providers: [UserAccountService,UserLoginService,UserRegistrationService],
    exports: [UserAccountService,UserLoginService,UserRegistrationService]
})
export class ApplicationUserModule{}
