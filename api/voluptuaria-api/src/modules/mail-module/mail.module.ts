import { Global, Module } from "@nestjs/common"
import { MailerModule, MailerOptions } from "@nestjs-modules/mailer"
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { ConfigService } from "@nestjs/config"

@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService): MailerOptions => {
                const options = {
                    transport: configService.getOrThrow("MAILER_TRANSPORT"),
                    defaults: {
                        from: `"${configService.getOrThrow("MAILER_APP_NAME")}" <${configService.getOrThrow("MAILER_APP_EMAIL")}>`,
                    },
                    template: {
                        dir: configService.getOrThrow("MAIL_TEMPLATES"),
                        adapter: new HandlebarsAdapter(),
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
export class MailModule {}
