import { Module } from "@nestjs/common"
import { TestController } from "./controllers/test.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from "../database-module/entities/user.entity"
import { UserModule } from "../user/user.module"
import { ConfigModule } from "@nestjs/config"
import { AppSecurityModule } from "../app-security/app-security.module"
import { InstagramModule } from "../instagram-module/instagram.module"
/**
 * @brief application dev testing
 * @todo remove at the end
 */
@Module({
    controllers: [TestController],
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        UserModule,
        ConfigModule,
        AppSecurityModule,
        InstagramModule
    ]
})
export class ApplicationDevTestingModule {
}
