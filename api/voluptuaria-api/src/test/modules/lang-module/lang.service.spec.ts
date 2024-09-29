import { LangService } from "../../../modules/lang-module/services/lang.service"
import { Test } from "@nestjs/testing"
import { ConfigModule } from "@nestjs/config"
import { LangModule } from "../../../modules/lang-module/lang.module"
import { LangServiceException } from "../../../modules/lang-module/exceptions/lang-service.exception"

describe("LangModule.LangService", () => {
    let langService: LangService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ isGlobal: true }), LangModule],
        }).compile()

        langService = moduleRef.get<LangService>(LangService)
    })

    test.each([
        {
            lang: "french",
            key: "message.welcome-user-intro",
            expectedValue: "Bienvenue sur notre plateforme Voluptuaria yahaya",
            replaces: { Username: "yahaya" },
        },
        {
            lang: "french",
            key: "message.welcome-user-intro",
            expectedValue:
                "Bienvenue sur notre plateforme Voluptuaria [Username]",
            replaces: {},
        },
        {
            lang: "french",
            key: "app.confirmation-code",
            expectedValue: "Code de confirmation",
            replaces: {},
        },
    ])(
        "translation in <$lang> for key <$key> with $expectedValue",
        ({ lang, key, expectedValue, replaces }) => {
            const translationResult = langService.translation({
                langFilename: lang,
                key: key,
                replaces: replaces,
            })

            expect(translationResult).toBe(expectedValue)
        },
    )

    it("should throw an exception", async () => {
        expect(() =>
            langService.translation({ langFilename: "no_exist", key: "#" }),
        ).toThrow(LangServiceException)
    })
})
