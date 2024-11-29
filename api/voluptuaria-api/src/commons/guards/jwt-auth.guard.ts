import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { UserLoginService } from "../../modules/user/services/user-login.service"

/**
 * @brief User authentication verifier guard
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
    /**
     * @brief authentication token key in headers
     */
    static AUTHENTICATION_TOKEN_KEY:string = "authentication_token"

    constructor(private readonly UserLoginService: UserLoginService) {
    }

    canActivate(context: ExecutionContext): boolean {
        try{
            const request = context.switchToHttp().getRequest()

            if(!(JwtAuthGuard.AUTHENTICATION_TOKEN_KEY in request.headers))
                throw new UnauthorizedException()

            const validatedToken = this.UserLoginService.validateToken(request.headers[JwtAuthGuard.AUTHENTICATION_TOKEN_KEY])

            if (validatedToken === null)
                throw new UnauthorizedException()

            request["user"] = validatedToken

            return true
        }
        catch(_){
            throw new UnauthorizedException()
        }
    }
}
