import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Observable } from "rxjs"
import { ConfigService } from "@nestjs/config"
import { Request, Response } from "express"
import { JwtService } from "@nestjs/jwt"

/**
 * Guard to verify the user authentication token
 */
@Injectable()
export class ApplicationAuthenticationGuard implements CanActivate{
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try{
            const httpContext = context.switchToHttp()
            const request = httpContext.getRequest<Request>()
            const response = httpContext.getResponse<Response>()

            // get keys
            const authenticationJwtHeaderKey = this.configService.get<string>("SECURITY_AUTHENTICATION_TOKEN_HEADER_KEY")
            const providedToken = request.header(authenticationJwtHeaderKey)

            // check if a token is provided
            if(providedToken === undefined){
                response.statusCode = 401
                response.json({
                    error: "Please provide an authentication token"
                })

                return false
            }

            return this.jwtService.verify(providedToken) !== null
        }
        catch(_){
            return false
        }
    }

}
