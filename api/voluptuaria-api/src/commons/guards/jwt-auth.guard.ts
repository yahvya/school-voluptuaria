import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UserLoginService } from '../../modules/user/services/user-login.service'
import { Request } from 'express';

/**
 * @brief Jwt token verification
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly UserLoginService: UserLoginService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        const validToken = this.UserLoginService.validateToken(token);
        if (!validToken) {
            throw new UnauthorizedException();
        }

        request['user'] = validToken;

        return true;
    }

    /**
     * @brief extract the token from the request headers
     * @param request request
     * @returns {string|null} the token or null
     */
    protected extractTokenFromHeader(request: Request): string | null {
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader) {
            return null;
        }

        // token sent as Bearer
        const parts = authorizationHeader.split(' ');

        if (parts.length === 2 && parts[0] === 'Bearer') {
            return parts[1];
        }

        return null;
    }
}
