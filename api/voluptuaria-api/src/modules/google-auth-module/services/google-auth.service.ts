import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, VerifyCallback } from "passport-google-oauth20"
import { ConfigService } from "@nestjs/config"
import { GoogleAuthResponse } from "../data-contracts/google-auth-response"

/**
 * @brief Google Auth Service.
 */
@Injectable()
export class GoogleAuthService extends PassportStrategy(Strategy, "google") {
    /**
     * @brief User datas from Google.
     * @protected
     */
    protected userDatas: GoogleAuthResponse

    constructor(protected configService: ConfigService) {
        super({
            clientID: configService.getOrThrow("GOOGLE_CLIENT_ID"),
            clientSecret: configService.getOrThrow("GOOGLE_CLIENT_SECRET"),
            callbackURL: configService.getOrThrow("GOOGLE_CALLBACK_URL"),
            scope: ["email", "profile"],
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { name, emails } = profile

        if (!name || !emails) {
            return done(new Error("Invalid profile structure"), null)
        }

        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            accessToken,
        }

        this.userDatas = new GoogleAuthResponse({
            email: user.email,
            name: user.lastName,
            firstname: user.firstName,
        })
        done(null, user)
    }

    /**
     * @brief Get user datas.
     * @returns {GoogleAuthResponse} User datas.
     */
    public getUserDatas(): GoogleAuthResponse {
        return this.userDatas
    }

    /**
     * @brief generate the authentication uri
     * @param options options
     * @returns {string} generate the authentication uri
     */
    public generateAuthUrl(options: {
        redirectUri:string,
        state: string|null
    }): string {
        const {redirectUri,state} = options

        const baseAuthUrl = this.configService.getOrThrow("GOOGLE_AUTH_BASE_URI")
        const params = new URLSearchParams({
            client_id: this.configService.getOrThrow("GOOGLE_CLIENT_ID"),
            redirect_uri: redirectUri,
            response_type: "code",
            scope: ["email", "profile"].join(" "),
            access_type: "offline",
            prompt: "consent",
            state: state ?? ""
        })

        return `${baseAuthUrl}?${params.toString()}`
    }
}
