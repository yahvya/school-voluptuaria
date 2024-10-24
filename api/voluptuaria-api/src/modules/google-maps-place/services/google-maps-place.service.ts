import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { LangService } from "../../lang-module/services/lang.service"
import { PlaceDatas } from "../data-contracts/place.datas"

@Injectable()
export class GoogleMapsPlaceService{
    constructor(
        protected readonly configService: ConfigService,
        protected readonly langService: LangService
    ) {
    }

    /**
     * @brief provide place data's by search string
     * @param options options
     * @returns {Promise<PlaceDatas>} place datas
     */
    public async getPlacesDatasBySearch(options: {
        search: String,
        lang: string
    }):Promise<PlaceDatas>{
        const {search,lang} = options

        if(!this.langService.loadLangFile({langFileName: lang}))
            throw new Error("Fail to load lang file")

        const requestUri = "https://places.googleapis.com/v1/places:searchText"
        const headers = {
            "X-Goog-Api-Key": this.configService.getOrThrow("GOOGLE_MAP_PLACE_API_KEY"),
            "X-Goog-FieldMask": "*",
            "Content-Type" : "application/json"
        }

        const body = {
            textQuery : search,
            languageCode: this.langService.getGoogleMapCode(),
            minRating: 2,
            pageSize: 5
        }

        console.log(body)

        return new PlaceDatas()
    }
}
