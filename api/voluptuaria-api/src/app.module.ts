import { Module } from '@nestjs/common';
import {UserRegistrationModule} from "./modules/user-registration-module/user-registration.module";

@Module({
  imports: [UserRegistrationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
