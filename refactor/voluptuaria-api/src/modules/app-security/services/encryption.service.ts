import { Injectable } from "@nestjs/common"
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto"
import { promisify } from "util"

/**
 * Application encrypting service
 */
@Injectable()
export class EncryptionService {
    /**
     * Encrypt the given element
     * @param toEncrypt to encrypt
     * @param secretKey secret key
     * @returns {Promise<{encryptionResult:string,iv:string}>} the encryption datas
     */
    public async encrypt({toEncrypt,secretKey}): Promise<{encryptionResult: string,iv: string}> {
        const iv = randomBytes(16)
        const key = (await promisify(scrypt)(secretKey,"salt",32,)) as Buffer
        const cipher = createCipheriv("aes-256-ctr", key, iv)

        return {
            encryptionResult: Buffer.concat([
                cipher.update(toEncrypt),
                cipher.final(),
            ]).toString("base64"),
            iv: iv.toString("base64"),
        }
    }

    /**
     * Decrypt from the encryption format
     * @param toDecrypt encryptionResult from the encryption method
     * @param secretKey same secret key used for the encryption
     * @param iv encryption iv
     * @returns {Promise<string|null>} the decrypted string or null on error
     */
    public async decrypt({toDecrypt,secretKey,iv}): Promise<string | null> {
        try {
            const baseIv = Buffer.from(iv, "base64")
            const encryptedBuffer = Buffer.from(toDecrypt, "base64")

            const key = (await promisify(scrypt)(secretKey,"salt",32)) as Buffer

            const decipher = createDecipheriv("aes-256-ctr", key, baseIv)

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
