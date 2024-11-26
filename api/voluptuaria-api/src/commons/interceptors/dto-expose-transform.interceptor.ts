import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { map, Observable } from "rxjs"
import { instanceToPlain } from "class-transformer"

/**
 * @brief apply the classes transformation
 */
@Injectable()
export class DtoExposeTransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                return instanceToPlain(data)
            }),
        )
    }
}
