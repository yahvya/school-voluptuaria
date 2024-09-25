import {Module} from "@nestjs/common";
import {databaseService} from "./services/database-service";

@Module({
    providers: [...databaseService],
    exports: [...databaseService],
    imports: []
})

export class DatabaseModule {}
