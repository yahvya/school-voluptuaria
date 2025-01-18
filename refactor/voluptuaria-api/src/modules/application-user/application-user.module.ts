import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from "../database/entities/user.entity"
import { UserAccountService } from "./services/user-account.service"

/**
 * Application user module
 */
@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [UserAccountService],
    exports: [UserAccountService]
})
export class ApplicationUserModule{}
