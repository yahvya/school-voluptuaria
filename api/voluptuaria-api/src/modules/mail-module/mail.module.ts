import { Global, Module } from "@nestjs/common"
import { MailerModule, MailerOptions } from "@nestjs-modules/mailer"
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { ConfigService } from "@nestjs/config"
import { LangService } from "../lang-module/services/lang.service"

@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService, LangService],
            useFactory: (
                configService: ConfigService,
                langService: LangService,
            ): MailerOptions => {
                const options = {
                    transport: configService.getOrThrow("MAILER_TRANSPORT"),
                    defaults: {
                        from: `"${configService.getOrThrow("MAILER_APP_NAME")}" <${configService.getOrThrow("MAILER_APP_EMAIL")}>`,
                    },
                    template: {
                        dir: configService.getOrThrow("MAIL_TEMPLATES"),
                        adapter: new HandlebarsAdapter({
                            translation: (options: any): string => {
                                return langService.translation({
                                    langFilename: options.hash.langFilename,
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
                }

                return options
            },
        }),
    ],
    providers: [],
})
@Global()
export class MailModule {
}
