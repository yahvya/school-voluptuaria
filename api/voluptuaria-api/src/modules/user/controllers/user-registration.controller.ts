import {
    Body,
    Controller,
    Post,
    Headers,
    HttpCode,
    UseGuards,
    Get,
    Query,
    Res,
} from "@nestjs/common"
import { UserRegistrationService } from "../services/user-registration.service"
import { UserRegistrationDatas } from "../data-contracts/user-registration/user-registration.datas"
import { UserRegistrationResponseDatas } from "../data-contracts/user-registration/user-registration-response.datas"
import { UserRegistrationConfirmationDatas } from "../data-contracts/user-registration/user-registration-confirmation.datas"
import { UserRegistrationConfirmationResponseDatas } from "../data-contracts/user-registration/user-registration-confirmation-response.datas"
import { GoogleRegistrationDatas } from "../data-contracts/google-registration/google-registration.datas"
import { GoogleRegistrationResponseDatas } from "../data-contracts/google-registration/google-registration-response.datas"
import { AuthGuard } from "@nestjs/passport"
import { GoogleRegistrationConfirmationDatas } from "../data-contracts/google-registration/google-registration-confirmation.datas"

/**
 * @brief Manage users registration process.
 */
@Controller("register")
export class UserRegistrationController {
    constructor(
        protected readonly userRegistrationService: UserRegistrationService,
    ) {}

    /**
     * @brief Validate user registration datas.
     * @param userRegistrationDatas User registration datas.
     * @param lang lang file name
     * @returns {UserRegistrationResponseDatas} Validation's Result.
     */
    @Post()
    @HttpCode(200)
    public register(
        @Body() userRegistrationDatas: UserRegistrationDatas,
        @Headers("lang") lang: string,
    ): Promise<UserRegistrationResponseDatas> {
        return this.userRegistrationService.register({
            userRegistrationDatas: userRegistrationDatas,
            lang: lang,
        })
    }

    /**
     * @brief try to confirm and create user account
     * @param userRegistrationConfirmationDatas confirmation datas
     * @returns {Promise<UserRegistrationConfirmationResponseDatas>} confirmation result
     */
    @Post("confirmation")
    @HttpCode(200)
    public registerConfirmation(
        @Body()
        userRegistrationConfirmationDatas: UserRegistrationConfirmationDatas,
    ): Promise<UserRegistrationConfirmationResponseDatas> {
        return this.userRegistrationService.confirmRegistration({
            userRegistrationConfirmationDatas:
                userRegistrationConfirmationDatas,
        })
    }

    /**
     * @brief start the Google registration process
     * @returns {GoogleRegistrationResponseDatas} response
     */
    @Post("by-google")
    @HttpCode(200)
    public startRegistrationFromGoogle(
        @Body() googleRegistrationDatas: GoogleRegistrationDatas,
    ): GoogleRegistrationResponseDatas {
        return this.userRegistrationService.startRegistrationFromGoogle({
            googleRegistrationDatas: googleRegistrationDatas,
        })
    }

    /**
     * @brief confirm google registration
     * @param state added state in the datas
     * @param res response
     * @returns {} registration confirmation
     */
    @Get("by-google/redirect")
    @HttpCode(200)
    @UseGuards(AuthGuard("google"))
    public async googleRegistrationConfirm(
        @Query("state") state: string,
        @Res() res: any,
    ): Promise<any> {
        const uri =
            await this.userRegistrationService.manageGoogleRegistrationRedirect(
                {
                    state: state,
                },
            )

        if (uri === null) {
            /**
             * @todo render an error page
             */
            return "error page"
        }

        return res.redirect(uri)
    }

    /**
     * @brief confirm user registration from Google
     * @param registrationConfirmationDatas confirmation datas
     * @returns {Promise<UserRegistrationConfirmationResponseDatas>} confirmation result
     */
    @Post("by-google/confirmation")
    @HttpCode(200)
    public async confirmGoogleRegistration(
        @Body()
        registrationConfirmationDatas: GoogleRegistrationConfirmationDatas,
    ): Promise<UserRegistrationConfirmationResponseDatas> {
        return this.userRegistrationService.confirmGoogleRegistration({
            registrationConfirmationDatas: registrationConfirmationDatas,
        })
    }

    /**
     * @todo remove tmp route
     */
    @Get("by-google/test")
    public test(@Query() q: any) {
        return q
    }
}
