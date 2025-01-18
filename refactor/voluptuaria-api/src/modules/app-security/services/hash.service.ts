import { Injectable } from "@nestjs/common"
import * as bcrypt from "bcrypt"

/**
 * Hash service
 */
@Injectable()
export class HashService {
    /**
     * Hash the given string
     * @param toHash string to hash
     * @param salt hash salt
     * @returns {Promise<string>} the hashed string
     * @attention use bcrypt algorithm
     */
    public async hash({toHash,salt = 10}): Promise<string> {
        return await bcrypt.hash(toHash, salt)
    }

    /**
     * Compare if the element is the same as the hash
     * @param toCompare string to compare
     * @param hash hash
     * @returns {Promise<boolean>} if are the same
     */
    public async compare({toCompare,hash}): Promise<boolean> {
        return await bcrypt.compare(toCompare,hash)
    }
}
