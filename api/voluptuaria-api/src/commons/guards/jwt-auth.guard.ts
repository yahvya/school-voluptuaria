import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from "@nestjs/common"
import { UserLoginService } from "../../modules/user/services/user-login.service"

/**
 * @brief Jwt token verification
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly UserLoginService: UserLoginService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const token = request.headers["authentication-token"]

        if (token == null || token === "") {
            throw new UnauthorizedException()
        }

        const validToken = this.UserLoginService.validateToken(token)
        if (!validToken) {
            throw new UnauthorizedException()
        }

        request["user"] = validToken

        return true
    }
}
