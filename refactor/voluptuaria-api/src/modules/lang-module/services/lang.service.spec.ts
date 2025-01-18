import { LangService } from "./lang.service"
import { Test } from "@nestjs/testing"
import { LangModule } from "../lang.module"
import { AppModule } from "../../../app.module"

describe("Test lang service", () => {
    let langService: LangService

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule,LangModule]
        }).compile()

        langService = module.get(LangService)
    })

    describe("Test translation method", () => {
        test.each([
            ["error.technical","Une erreur technique s'est produite",{}],
            ["error.bad-fields","Veuillez vérifier les informations saisies",{}],
            ["error.bad-confirmation-code","Code saisie incorrect",{}],
            ["message.welcome-user-intro","Bienvenue sur notre plateforme Voluptuaria tester",{"Username": "tester"}]
        ])
        ("should provide for key (%s) the translated value (%s)",(key:string,expectedValue:string,replaces:Record<string,string>) => {
            expect(() => {
                expect(langService.translation({
                    langFileName: "french",
                    key: key,
                    replaces: replaces
                })).toBe(expectedValue)
            }).not.toThrow()
        })
    })
})
