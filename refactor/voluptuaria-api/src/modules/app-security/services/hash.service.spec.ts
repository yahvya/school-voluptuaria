import { Test } from "@nestjs/testing"
import { AppSecurityModule } from "../app-security.module"
import { HashService } from "./hash.service"

describe("Test hash service", () => {
    let hashService:HashService

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppSecurityModule]
        }).compile()

        hashService = module.get(HashService)
    })

    describe("Test hash", () => {
        test.each([
            ["to hash 1",10],
            ["to hash 2",11],
            ["to hash 3",5]
        ])
        ("should return a string, to hash : %s - salt : %d",async (toHash:string,salt:number) => {
            await expect(hashService.hash({toHash: toHash,salt: salt})).resolves.not.toBe(null)
        })


    })
})
