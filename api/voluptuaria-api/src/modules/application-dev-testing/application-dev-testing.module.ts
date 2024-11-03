import { Module } from "@nestjs/common"
import { TestController } from "./controllers/test.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from "../database-module/entities/user.entity"
import { UserModule } from "../user/user.module"

/**
 * @brief application dev testing
 * @todo remove at the end
 */
@Module({
    controllers: [TestController],
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        UserModule
    ]
})
export class ApplicationDevTestingModule {
}
