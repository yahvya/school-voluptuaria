import { EncryptionService } from "./encryption.service"
import { Test } from "@nestjs/testing"
import { AppSecurityModule } from "../app-security.module"

describe("Test encryption service", () => {
    let encryptionService: EncryptionService

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppSecurityModule]
        }).compile()

        encryptionService = module.get(EncryptionService)
    })

    describe("Test encryption and decryption", () => {
        test.each([ ["to encrypt 1","secret 1"],["to encrypt 2","secret 2"] ])
        ("should be able to encrypt (%s) with the secret (%s) and decrypt it",async (toEncrypt:string,secretKey:string) => {
            const encryptionResult = await encryptionService.encrypt({toEncrypt: toEncrypt,secretKey: secretKey})
            const decryptionResult = await encryptionService.decrypt({toDecrypt: encryptionResult.encryptionResult,iv: encryptionResult.iv,secretKey: secretKey})

            expect(decryptionResult).toBe(toEncrypt)
        })
    })
})
