import { Global, Module } from "@nestjs/common"
import { StringService } from "./services/string.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { RegisteredPlacesEntity } from "../database/entities/registered-places.entity"

/**
 * Application utilities module
 */
@Module({
    imports: [TypeOrmModule.forFeature([RegisteredPlacesEntity])],
    providers: [StringService],
    exports: [StringService],
})
@Global()
export class UtilitiesModule {
}
