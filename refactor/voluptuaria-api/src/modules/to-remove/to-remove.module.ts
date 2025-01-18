import { Module } from "@nestjs/common"
import { TestController } from "./controllers/test.controller"

/**
 * Application quick tests module
 */
@Module({
    controllers: [TestController]
})
export class ToRemoveModule{}
