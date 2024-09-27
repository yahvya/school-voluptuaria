import { Injectable } from "@nestjs/common"
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto"
import { promisify } from "util"

/**
 * @brief application encrypting service
 */
@Injectable()
export class EncryptService {
    /**
     * @brief encrypt the given element
     * @param options options
     * @returns {Promise<{encryptionResult:string,iv:string}>} the encryption datas
     */
    public async encrypt(options: {
        toEncrypt: string
        secretKey: string
    }): Promise<{
        encryptionResult: string
        iv: string
    }> {
        const iv = randomBytes(16)
        const key = (await promisify(scrypt)(
            options.secretKey,
            "salt",
            32,
        )) as Buffer
        const cipher = createCipheriv("aes-256-ctr", key, iv)

        return {
            encryptionResult: Buffer.concat([
                cipher.update(options.toEncrypt),
                cipher.final(),
            ]).toString("base64"),
            iv: iv.toString("base64"),
        }
    }

    /**
     * @brief decrypt from the given datas
     * @param options options
     * @returns {Promise<string,null>} the decrypted string or null on error
     */
    public async decrypt(options: {
        toDecrypt: string
        secretKey: string
        iv: string
    }): Promise<string | null> {
        try {
            const iv = Buffer.from(options.iv, "base64")
            const encryptedBuffer = Buffer.from(options.toDecrypt, "base64")

            const key = (await promisify(scrypt)(
                options.secretKey,
                "salt",
                32,
            )) as Buffer

            const decipher = createDecipheriv("aes-256-ctr", key, iv)

            const decrypted = Buffer.concat([
                decipher.update(encryptedBuffer),
                decipher.final(),
            ])

            return decrypted.toString()
        } catch (_) {
            return null
        }
    }
}
