import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from "@nestjs/common"
import { UserLoginService } from "../../modules/user/services/user-login.service"
import { Request } from "express"

/**
 * @brief Jwt token verification
 */
@Injectable()
export class VoluptuariaAuthGuard implements CanActivate {
    constructor(private readonly UserLoginService: UserLoginService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const voluptariaToken = request.headers["voluptaria-token"]

        if (voluptariaToken == null || voluptariaToken === "") {
            throw new UnauthorizedException()
        }

        const validApiToken = this.UserLoginService.getHashedApiToken()

        if (validApiToken != voluptariaToken) {
            throw new UnauthorizedException()
        }

        return true
    }
}
