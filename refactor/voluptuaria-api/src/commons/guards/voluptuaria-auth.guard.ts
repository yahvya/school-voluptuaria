import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Request, Response } from "express"
import { EncryptionService } from "../../modules/app-security/services/encryption.service"

/**
 * Guard to verify the voluptuaria application token
 */
@Injectable()
export class VoluptuariaAuthGuard implements CanActivate{
    constructor(
        private readonly configService: ConfigService,
        private readonly encryptService: EncryptionService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try{
            // load keys from env
            const voluptuariaHeaderTokenKeyName = this.configService.get<string>("SECURITY_VOLUPTUARIA_TOKEN_HEADER_KEY")
            const voluptuariaHeaderTokenIvName = this.configService.get<string>("SECURITY_VOLUPTUARIA_TOKEN_IV_KEY")
            const httpContext = context.switchToHttp()

            const request = httpContext.getRequest<Request>()
            const response = httpContext.getResponse<Response>()

            // check token are provided
            const providedToken = request.header(voluptuariaHeaderTokenKeyName)
            const providedIv = request.header(voluptuariaHeaderTokenIvName)

            if(providedToken === undefined || providedIv === undefined){
                response.statusCode = 401
                response.json({
                    "error" : "Please provide the token"
                })
                return false
            }

            // verify values
            const decryptedValue = await this.encryptService.decrypt({
                toDecrypt: providedToken,
                iv: providedIv,
                secretKey: this.configService.get<string>("SECURITY_VOLUPTUARIA_TOKEN_SECRET")
            })

            if(decryptedValue !== this.configService.get<string>("SECURITY_VOLUPTUARIA_TOKEN_CLEAR_VALUE")){
                response.statusCode = 401
                response.json({
                    "error" : "Please provide a valid token",
                    "decryptedValue" : decryptedValue,
                    "getValue" : this.configService.get("SECURITY_VOLUPTUARIA_TOKEN_CLEAR_VALUE")
                })
                return false
            }

            return true
        }
        catch(_){
            return false
        }
    }

}
