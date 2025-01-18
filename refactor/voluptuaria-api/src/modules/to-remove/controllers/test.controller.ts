import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common"
import { VoluptuariaAuthGuard } from "../../../commons/guards/voluptuaria-auth.guard"
import { ApplicationAuthenticationGuard } from "../../../commons/guards/application-authentication.guard"

/**
 * application quick test controller
 */
@Controller("test")
export class TestController{
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
}
