import { Injectable } from "@nestjs/common"
import { LangServiceException } from "../exceptions/lang-service.exception"
import * as fs from "node:fs"
import { ConfigService } from "@nestjs/config"
import { XMLParser } from "fast-xml-parser"

/**
 * @brief lang files and lang manager service
 */
@Injectable()
export class LangService {
    /**
     * @brief the current loaded lang filename
     */
    protected currentLang: string | null

    /**
     * @brief lang values
     */
    protected langValues: Record<string, string>

    /**
     * @brief lang name in French
     */
    protected frenchName: string | null

    /**
     * @brief map code
     */
    protected googleMapCode: string | null

    /**
     * @brief open weather map code
     */
    protected openWeatherMapCode: string | null

    /**
     * @brief lang name in the lang
     */
    protected langName: string | null

    constructor(protected readonly configService: ConfigService) {
        this.currentLang = null
        this.langValues = {}
        this.langName = null
        this.openWeatherMapCode = null
        this.googleMapCode = null
        this.frenchName = null
    }

    /**
     * @brief provide the translated value of the given key from the given lang
     * @param options options
     * @returns {string} the translated value
     * @throws {LangServiceException} in case of error
     */
    public translation(options: {
        langFilename: string
        key: string
        replaces?: Record<string, string>
    }): string {
        if (!(this.loadLangFile({ langFileName: options.langFilename })))
            throw new LangServiceException("Fail to load lang file")

        if (!(options.key in this.langValues))
            throw new LangServiceException(`Unknown lang key <${options.key}>`)

        return options.replaces !== undefined
            ? this.replaceElements({
                  replaces: options.replaces,
                  str: this.langValues[options.key],
              })
            : this.langValues[options.key]
    }

    /**
     * @brief replaces generic elements in the string
     * @param options options
     * @returns {string} the modified string
     */
    protected replaceElements(options: {
        replaces: Record<string, string>
        str: string
    }): string {
        let modifiedString = options.str

        for (const key in options.replaces) {
            const regex = new RegExp(`\\[${key}\\]`, "g")

            modifiedString = modifiedString.replace(
                regex,
                options.replaces[key],
            )
        }

        return modifiedString
    }

    /**
     * @brief load a lang file in the service
     * @param options options
     * @returns {boolean} load success
     * @throws {Error} on error
     */
    protected loadLangFile(options: {
        langFileName: string
    }): boolean {
        if (
            this.currentLang !== null &&
            options.langFileName === this.currentLang
        )
            return true

        try {
            const langSupposedFilePath = `${this.configService.getOrThrow("LANG_FILES_DIRECTORY_PATH")}/${options.langFileName}.xml`

            if (!fs.existsSync(langSupposedFilePath)) return false

            const langXml = fs.readFileSync(langSupposedFilePath)
            const parser = new XMLParser({
                ignoreAttributes: false,
                attributeNamePrefix: "",
                ignoreDeclaration: true,
                ignorePiTags: true,
                parseAttributeValue: true,
            })

            const langFileContent = parser.parse(langXml)
            const keysToRead = [
                "error-level",
                "application-level",
                "message-level",
            ]

            this.langValues = {}
            this.currentLang = options.langFileName

            keysToRead.forEach((key) => {
                const langElements: Array<any> =
                    langFileContent.lang[key]["lang-element"]

                langElements.forEach(
                    (langElement) =>
                        (this.langValues[langElement.key] = langElement.value),
                )
            })

            return true
        } catch (_) {
            return false
        }
    }

    /**
     * @returns {string} lang name
     */
    public getLangName(): string {
        return this.langName
    }

    /**
     * @returns {string|null} lang name
     */
    public getCurrentLang(): string | null {
        return this.currentLang
    }

    /**
     * @returns {Record<string, string>} lang values
     */
    public getLangValues(): Record<string, string> {
        return this.langValues
    }

    /**
     * @returns {string|null} lang name in French
     */
    public getFrenchName(): string | null {
        return this.frenchName
    }

    /**
     * @returns {string|null} google map translation code
     */
    public getGoogleMapCode(): string | null {
        return this.googleMapCode
    }

    /**
     * @returns {string|null} open weather map code
     */
    public getOpenWeatherMapCode(): string | null {
        return this.openWeatherMapCode
    }
}
