import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from "../database/entities/user.entity"
import { UserAccountService } from "./services/user-account.service"
import { UserLoginService } from "./services/user-login.service"
import { UserLoginController } from "./controllers/user-login.controller"

/**
 * Application user module
 */
@Module({
    controllers: [UserLoginController],
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [UserAccountService,UserLoginService],
    exports: [UserAccountService,UserLoginService]
})
export class ApplicationUserModule{}
