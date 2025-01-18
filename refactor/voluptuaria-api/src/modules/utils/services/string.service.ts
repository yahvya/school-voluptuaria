import { Injectable } from "@nestjs/common"

/**
 * String utility service
 */
@Injectable()
export class StringService {
    /**
     * Generate a random string
     * @param length generated string length
     * @param fromCharacters source to pick characters from
     * @returns {string} the generated string
     */
    public random(
        {length,fromCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@:;?"}:
        {length:string,fromCharacters:string}
    ): string {
        let result: string = ""

        for(;length > 0; length--)
            result += fromCharacters.charAt(Math.floor(Math.random() * fromCharacters.length))

        return result
    }
}
