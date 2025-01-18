import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common"
import { validate } from "class-validator"
import { plainToInstance } from "class-transformer"

/**
 * Apply validation on request elements
 */
@Injectable()
export class ValidationPipe implements PipeTransform<> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype))
            return value

        const object = plainToInstance(metatype, value)
        const errors = await validate(object)
        if (errors.length > 0)
            throw new BadRequestException(errors)

        return value
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object]
        return !types.includes(metatype)
    }
}
