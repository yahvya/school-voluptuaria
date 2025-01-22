import { Module } from "@nestjs/common"
import { TestController } from "./controllers/test.controller"
import { InstagramModule } from "../instagram/instagram.module"

/**
 * Application quick tests module
 */
@Module({
    controllers: [TestController],
    imports: [InstagramModule]
})
export class ToRemoveModule{}
