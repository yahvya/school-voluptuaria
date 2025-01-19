import { Global, Module } from "@nestjs/common"
import { MailerModule, MailerOptions } from "@nestjs-modules/mailer"
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { ConfigService } from "@nestjs/config"
import { LangService } from "../lang-module/services/lang.service"
import { LangModule } from "../lang-module/lang.module"

/**
 * Application maling modyle
 */
@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [LangModule],
            inject: [ConfigService, LangService],
            useFactory: (
                configService: ConfigService,
                langService: LangService,
            ): MailerOptions => ({
                transport: configService.getOrThrow("MAILER_TRANSPORT"),
                defaults: {
                    from: `"${configService.getOrThrow("MAILER_APP_NAME")}" <${configService.getOrThrow("MAILER_APP_EMAIL")}>`
                },
                template: {
                    dir: configService.getOrThrow("MAILER_TEMPLATES"),
                    adapter: new HandlebarsAdapter({
                        translation: (options: any): string => {
                            return langService.translation({
                                langFileName: options.hash.langFileName,
                                key: options.hash.key,
                                replaces: options.hash.replaces ?? {},
                            })
                        },
                        json: (options: any): Record<string, any> =>
                            options.hash,
                    }),
                    options: {
                        strict: true,
                    },
                },
            } as MailerOptions),
        }),
    ],
    providers: [],
})
@Global()
export class MailModule {
}
