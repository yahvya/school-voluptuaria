import { StringService } from "./string.service"
import { Test } from "@nestjs/testing"
import { UtilitiesModule } from "../utilities.module"

describe("String service test",() => {
    let stringService: StringService

    beforeAll(async () => {
        const module = await Test
            .createTestingModule({
                imports: [UtilitiesModule]
            })
            .compile()

        stringService = module.get(StringService)
    })

    describe("Test random string generation",() => {
        test.each([ [10],[0],[1],[3],[200] ])
        ("should generate strings with the provided length",(length:number) => {
            expect(() => {
                expect(stringService.random({length: length}).length).toBe(length)
            }).not.toThrow()
        })

        test.each([ ["abc",10],["tiu",30],["tuple",40] ])
        ("should generate strings which only contains the provided source characters",(sourceCharacters:string,length:number) => {
            const result = stringService.random({length: length,fromCharacters: sourceCharacters})
            const sourceCharactersList = sourceCharacters.split("")

            expect(() => {
                expect(result.split("").every((resultChar) => sourceCharactersList.includes(resultChar))).toBe(true)
            }).not.toThrow()
        })
    })
})
