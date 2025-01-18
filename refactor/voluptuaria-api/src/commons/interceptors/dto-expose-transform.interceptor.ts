import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { map, Observable } from "rxjs"
import { instanceToPlain } from "class-transformer"

/**
 * Apply transformation for request and responses data contract
 */
@Injectable()
export class DtoExposeTransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe( map((data) => instanceToPlain(data)) )
    }
}
