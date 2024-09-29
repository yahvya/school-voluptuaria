import { Module } from "@nestjs/common"
import { TestController } from "./controllers/test.controller"

/**
 * @brief application dev testing
 * @todo remove at the end
 */
@Module({
    controllers: [TestController],
})
export class ApplicationDevTestingModule {}
