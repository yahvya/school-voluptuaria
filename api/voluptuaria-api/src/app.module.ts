import {UserModule} from "./modules/user/user.module";
import {ConfigModule} from "@nestjs/config";
import {LangModule} from "./modules/lang-module/lang.module";
import {Module} from "@nestjs/common";

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({isGlobal: true}),
    LangModule
  ]
})
export class AppModule {}
