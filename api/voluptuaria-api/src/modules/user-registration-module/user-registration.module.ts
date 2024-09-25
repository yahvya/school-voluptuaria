import {Module} from "@nestjs/common";
import {UserRegistrationController} from "./controllers/user-registration-controller";
import {UserRegistrationService} from "./services/user-registration-service";

@Module({
    controllers: [UserRegistrationController],
    providers: [UserRegistrationService],
})

export class UserRegistrationModule {}
