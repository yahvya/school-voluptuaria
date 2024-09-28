import { EncryptService } from "../../../modules/app-security/services/encrypt.service"

describe("AppSecurity.EncryptService", () => {
    let encryptService:EncryptService

    beforeAll(async () => {
        encryptService = new EncryptService()
    })

    test
        .each([
            {
                value: "yahaya",
                key: "secret_key"
            },
            {
                value: "ambroise",
                key: "another_secret"
            }
        ])
        ("encryption of <$value> with <$key> should be decrypted the same",async ({ value,key }) => {
            const {encryptionResult,iv} = await encryptService.encrypt({
                toEncrypt: value,
                secretKey: key
            })

            const decryptedResult = await encryptService.decrypt({
                toDecrypt: encryptionResult,
                iv: iv,
                secretKey: key
            })

            expect(decryptedResult).toBe(value)
        })
})
