import { Controller, Get } from "@nestjs/common"
import { EncryptService } from "../../app-security/services/encrypt.service"
import { ConfigService } from "@nestjs/config"

@Controller("test")
export class TestController {
    constructor(protected encryptservice : EncryptService,protected configService:ConfigService) {

    }

    @Get()
    public async test():Promise<any>{
    }

}
