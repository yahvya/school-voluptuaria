import { Injectable } from "@nestjs/common"

/**
 * @brief string utils service
 */
@Injectable()
export class StringService {
    /**
     * @brief generate a random string
     * @param options options
     * @returns {string} the generated string
     */
    public random(options: { length: number }): string {
        let result: string = ""
        const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@:;?"
        const charactersLength: number = characters.length
        let counter: number = 0

        while (counter < options.length) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength),
            )
            counter += 1
        }

        return result
    }
}
