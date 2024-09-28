import { HashService } from "../../../modules/app-security/services/hash.service"

describe("AppSecurity.HashService",() => {
    let hashService:HashService

    beforeAll(() => {
        hashService = new HashService()
    })

    test
        .each([
            {toHash: "first_password",falseCompare: "bad"},
            {toHash: "second_password",falseCompare: "bad"}
        ])
        ("the hash should be comparable",async ({toHash,falseCompare}) => {
            const hashResult = await hashService.hash({
                toHash: toHash,
                salt: 10
            })

            expect(await hashService.compare({toCompare: toHash,hash: hashResult})).toBe(true)
            expect(await hashService.compare({toCompare: falseCompare,hash: hashResult})).toBe(false)
        })
})
