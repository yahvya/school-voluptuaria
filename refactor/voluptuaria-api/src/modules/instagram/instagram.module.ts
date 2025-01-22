import { Module } from "@nestjs/common"
import { InstagramService } from "./services/instagram.service"

/**
 * Instagram module
 */
@Module({
    providers: [InstagramService],
    exports: [InstagramService],
})
export class InstagramModule{}
