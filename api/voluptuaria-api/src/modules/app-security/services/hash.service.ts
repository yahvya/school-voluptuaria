import { Injectable } from "@nestjs/common"
import * as bcrypt from "bcrypt"

/**
 * @brief hash service
 */
@Injectable()
export class HashService {
    /**
     * @brief hash the given string
     * @param options options
     * @returns {Promise<string>} the hashed string
     * @attention use bcrypt algorithm
     */
    public async hash(options: {
        toHash: string
        salt: number
    }): Promise<string> {
        return await bcrypt.hash(options.toHash, 10)
    }

    /**
     * @brief compare if the element is the same as the hash
     * @param options options
     * @returns {Promise<boolean>} if are the same
     */
    public async compare(options: {
        toCompare: string
        hash: string
    }): Promise<boolean> {
        return await bcrypt.compare(options.toCompare, options.hash)
    }
}
