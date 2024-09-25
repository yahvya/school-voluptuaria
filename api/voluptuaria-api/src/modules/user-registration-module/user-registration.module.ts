import {Module} from "@nestjs/common";
import {UserRegistrationController} from "./controllers/user-registration-controller";

@Module({
    controllers: [UserRegistrationController],
})

export class UserRegistrationModule {}
