import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { EncryptService } from "../../modules/app-security/services/encrypt.service"
import { ConfigService } from "@nestjs/config"
import { isObject } from "class-validator"

/**
 * @brief Api token verification
 */
@Injectable()
export class VoluptuariaAuthGuard implements CanActivate {
    /**
     * @brief access config key in headers 
     */
    static ACCESS_CONFIG_KEY:string = "voluptuaria_access_config"
    
    constructor(
        private readonly encryptService: EncryptService,
        protected readonly configService: ConfigService,
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try{
            const request = context.switchToHttp().getRequest()

            if (!(VoluptuariaAuthGuard.ACCESS_CONFIG_KEY in request.headers))
                throw new UnauthorizedException()

            const config = JSON.parse(request.headers[VoluptuariaAuthGuard.ACCESS_CONFIG_KEY])

            if(!isObject(config) || !("iv" in config) || !("token" in config))
                throw new UnauthorizedException()
            
            const apiProvidedToken = await this.encryptService.decrypt({
                iv: config["iv"] as string,
                toDecrypt: config["token"] as string,
                secretKey: this.configService.getOrThrow("API_TOKEN_SECRET")
            })

            if (this.configService.getOrThrow("API_SECRET") !== apiProvidedToken)
                throw new UnauthorizedException()

            return true
        }
        catch(_){
            throw new UnauthorizedException()
        }
    }
}
