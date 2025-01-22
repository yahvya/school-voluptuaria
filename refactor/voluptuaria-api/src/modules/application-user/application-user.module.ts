import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from "../database/entities/user.entity"
import { UserAccountService } from "./services/user-account.service"
import { UserLoginService } from "./services/user-login.service"
import { UserLoginController } from "./controllers/user-login.controller"
import { UserRegistrationController } from "./controllers/user-registration.controller"
import { UserRegistrationService } from "./services/user-registration.service"
import { LangModule } from "../lang-module/lang.module"
import { GoogleAuthModule } from "../google-auth-module/google-auth.module"
import { UserAccountManagementService } from "./services/user-account-management.service"
import { UserAccountManagementController } from "./controllers/user-account-management.controller"
import { RegisteredPlacesEntity } from "../database/entities/registered-places.entity"

/**
 * Application user module
 */
@Module({
    controllers: [UserLoginController,UserRegistrationController,UserAccountManagementController],
    imports: [
        TypeOrmModule.forFeature([UserEntity,RegisteredPlacesEntity]),
        LangModule,
        GoogleAuthModule
    ],
    providers: [UserAccountService,UserLoginService,UserRegistrationService,UserAccountManagementService],
    exports: [UserAccountService,UserLoginService,UserRegistrationService,UserAccountManagementService]
})
export class ApplicationUserModule{}
