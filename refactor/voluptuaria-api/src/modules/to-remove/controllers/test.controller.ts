import { Controller, Get, HttpCode, Query, UseGuards } from "@nestjs/common"
import { VoluptuariaAuthGuard } from "../../../commons/guards/voluptuaria-auth.guard"
import { ApplicationAuthenticationGuard } from "../../../commons/guards/application-authentication.guard"
import { InstagramService } from "../../instagram/services/instagram.service"
import { ConfigService } from "@nestjs/config"
import { EncryptionService } from "../../app-security/services/encryption.service"

/**
 * application quick test controller
 */
@Controller("test")
export class TestController{
    constructor(
        private readonly instagramService: InstagramService,
        private readonly configService: ConfigService,
        private readonly encryptService:EncryptionService
    ) {}

    @Get("voluptuaria-guard")
    @HttpCode(200)
    @UseGuards(VoluptuariaAuthGuard)
    public testVoluptuariaGuard():string{
        return "ok"
    }

    @Get("authentication-guard")
    @HttpCode(200)
    @UseGuards(ApplicationAuthenticationGuard)
    public testAuthenticationGuard():string{
        return "ok"
    }

    @Get("google-redirection")
    public test(@Query() q: any) {
        return q
    }

    @Get("instagram")
    public testInstagram(){
        return this.instagramService.extractPostOf({userPseudo: "chakeryaakoub"})
    }

    @Get("/voluptuaria-token")
    public getToken(){
        return this.encryptService.encrypt({
            toEncrypt: this.configService.get("SECURITY_VOLUPTUARIA_TOKEN_CLEAR_VALUE"),
            secretKey: this.configService.get("SECURITY_VOLUPTUARIA_TOKEN_SECRET")
        })
    }
}
