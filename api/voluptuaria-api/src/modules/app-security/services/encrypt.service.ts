import { Injectable } from "@nestjs/common"
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util'

/**
 * @brief application encrypting service
 */
@Injectable()
export class EncryptService{
    /**
     * @brief encrypt the given element
     * @param options options
     * @returns {Promise<{encryptionResult:string,iv:string}>} the encryption datas
     */
    public async encrypt(options: {toEncrypt:string,secretKey:string}):Promise<{encryptionResult:string,iv:string}>{
        const iv = randomBytes(16)
        const key = (await promisify(scrypt)(options.secretKey, "salt", 32)) as Buffer;
        const cipher = createCipheriv("aes-256-ctr", key, iv)

        return {
            encryptionResult: Buffer.concat([
                cipher.update(options.toEncrypt),
                cipher.final()
            ]).toString("base64"),
            iv: iv.toString("base64")
        }
    }
}