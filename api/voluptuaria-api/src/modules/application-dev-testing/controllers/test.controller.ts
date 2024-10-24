import { Controller } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Controller("test")
export class TestController {
    constructor(protected configService: ConfigService) {
    }

    /*
    @Get('test')
    public async test():Promise<{ encryptionResult: string; iv: string }> {
        return this.userLoginService.test()
    }

     */
}
