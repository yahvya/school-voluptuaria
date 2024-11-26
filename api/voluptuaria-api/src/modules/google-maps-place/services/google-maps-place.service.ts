import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { LangService } from "../../lang-module/services/lang.service"
import { PlaceDatas } from "../data-contracts/place.datas"
import axios from "axios"
import { OpeningHourDatas } from "../data-contracts/opening-hour.datas"
import { CommentsDatas } from "../data-contracts/comments.datas"
import { AccessibilityDatas } from "../data-contracts/accessibility.datas"
import { ImagesDatas } from "../data-contracts/images.datas"

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
     * @returns {Promise<PlaceDatas[]>} places datas
     * @throws {Error} on error
     */
    public async getPlacesDatasBySearch(options: {
        search: String,
        lang: string,
        minRating: number
    }):Promise<PlaceDatas[]>{
        const {search,lang,minRating} = options

        if(!this.langService.loadLangFile({langFileName: lang}))
            throw new Error("Fail to load lang file")

        const requestUri = "https://places.googleapis.com/v1/places:searchText"
        const headers = {
            "X-Goog-Api-Key": this.configService.getOrThrow("GOOGLE_MAPS_PLACE_API_KEY"),
            "X-Goog-FieldMask": "*",
            "Content-Type" : "application/json"
        }

        const body = {
            textQuery : search,
            languageCode: this.langService.getGoogleMapCode(),
            minRating: minRating,
            pageSize: 15
        }

        const config = {
            headers: headers
        }

        try{
            const response = await axios.post(requestUri,body,config)

            if(response.status !== 200)
                throw new Error()

            const datas = response.data

            if(!("places" in datas))
                throw new Error()

            return datas.places.map((place) => this.parsePlaceDatas({placeDatas: place}))
        }
        catch(_){
            throw new Error("Fail to load maps datas")
        }
    }

    /**
     * @brief provide place datas by categories
     * @param options options
     * @returns {Promise<PlaceDatas>} datas
     * @throws {Error} on error
     */
    public getPlacesDatasByCategories(options: {
        categories:string[],
        lang: string,
        minRating: number
    }):Promise<PlaceDatas[]>{
        const {categories,lang,minRating} = options

        return this.getPlacesDatasBySearch({
            search: categories.join(" or "),
            lang: lang,
            minRating: minRating
        })
    }

    /**
     * @brief parse place datas
     * @param options options
     * @protected
     * @returns {PlaceDatas} place datas
     * @throws {Error} on error
     */
    protected parsePlaceDatas(options: {placeDatas: Record<string,any>}):PlaceDatas{
        const {placeDatas} = options

        const resultPlaceDatas = new PlaceDatas()

        // opened now
        if(
            "currentOpeningHours" in placeDatas &&
            "openNow" in placeDatas.currentOpeningHours
        )
            resultPlaceDatas.isOpenedNow = placeDatas.currentOpeningHours.openNow
        else
            resultPlaceDatas.isOpenedNow = false

        // place name
        if(
            !("displayName" in placeDatas) ||
            !("text" in placeDatas.displayName)
        )
            throw new Error("No display name for the name")

        resultPlaceDatas.placeName = placeDatas.displayName.text

        // google map uri
        if(!("googleMapsUri" in placeDatas))
            throw new Error("No google maps open uri")

        resultPlaceDatas.openOnGoogleMapsUri = placeDatas.googleMapsUri

        if(!("rating" in placeDatas))
            throw new Error("No rating found")

        resultPlaceDatas.rating = Math.floor(placeDatas.rating)

        // phonenumber
        resultPlaceDatas.phoneNumber = placeDatas.internationalPhoneNumber ?? null

        // open for kids
        resultPlaceDatas.forKids = placeDatas.goodForChildren ?? null

        // place location
        if(
            !("location" in placeDatas) ||
            !("longitude" in placeDatas.location) ||
            !("latitude" in placeDatas.location) ||
            !("formattedAddress" in placeDatas)
        )
            throw new Error("No location found")

        resultPlaceDatas.coordinate = {
            latitude: placeDatas.location.latitude.toString(),
            longitude: placeDatas.location.longitude.toString(),
            fullAddress: placeDatas.formattedAddress
        }

        // access id
        if(!("id" in placeDatas))
            throw new Error("No id found")

        resultPlaceDatas.accessId = placeDatas.id

        // openingHoursregister
        resultPlaceDatas.openingHours = []

        if(
            "currentOpeningHours" in placeDatas &&
            "weekdayDescriptions" in placeDatas.currentOpeningHours
        ){
            const weekdayDescriptions = placeDatas.currentOpeningHours.weekdayDescriptions

            resultPlaceDatas.openingHours = weekdayDescriptions.map((weekDayDescription) => this.parseWeekdayDescription({
                weekdayDescription: weekDayDescription
            }))
        }

        // prices

        // categories
        if(!("types" in placeDatas))
            throw new Error("No types found")

        resultPlaceDatas.categories = placeDatas.types

        // comments
        resultPlaceDatas.comments = []

        if("reviews" in placeDatas)
            resultPlaceDatas.comments = placeDatas.reviews.map((review) => this.parseReview({review: review}))

        // images
        resultPlaceDatas.images = []

        const apiKey = this.configService.getOrThrow("GOOGLE_MAPS_PLACE_API_KEY")
        const baseUri = "https://places.googleapis.com/v1/"

        if ("photos" in placeDatas) {
            resultPlaceDatas.images = placeDatas.photos.map(photoDatas => {
                if (
                    !("name" in photoDatas) ||
                    !("widthPx" in photoDatas)
                )
                    throw new Error("Fail to load image")

                const searchParams = new URLSearchParams({
                    key: apiKey,
                    maxWidthPx: photoDatas.widthPx.toString()
                });

                return {
                    url: `${baseUri}${photoDatas.name}/media?${searchParams.toString()}`,
                    description: "place image"
                } as ImagesDatas
            });
        }

        // accessibility
        resultPlaceDatas.accessibility = null

        if("accessibilityOptions" in placeDatas){
            resultPlaceDatas.accessibility = new AccessibilityDatas()

            resultPlaceDatas.accessibility.canAccessParking = "wheelchairAccessibleParking" in placeDatas.accessibilityOptions ? placeDatas.accessibilityOptions.wheelchairAccessibleParking : false
            resultPlaceDatas.accessibility.canAccessEntrance = "wheelchairAccessibleEntrance" in placeDatas.accessibilityOptions ? placeDatas.accessibilityOptions.wheelchairAccessibleEntrance : false
            resultPlaceDatas.accessibility.canAccessRestPlace = "wheelchairAccessibleRestroom" in placeDatas.accessibilityOptions ? placeDatas.accessibilityOptions.wheelchairAccessibleRestroom : false
        }

        return resultPlaceDatas
    }

    /**
     * @brief parse a review datas and convert it to comment datas
     * @param options
     * @protected
     * @returns {CommentsDatas} datas
     * @throws {Error} error
     */
    protected parseReview(options: {review: Record<string,any>}):CommentsDatas{
        const result = new CommentsDatas()
        const {review} = options

        result.rating = Math.floor(review.rating)
        if("text" in review)
            result.comment = review.text.text ?? ""
        else
            result.comment = ""

        result.wroteAt = review.publishTime

        return result
    }

    /**
     * @brief parse a weekday description string and convert it to
     * @param options options
     * @protected
     * @returns {OpeningHourDatas} parsed opening hours
     * @throws {Error} on parse failure
     */
    protected parseWeekdayDescription(options: {weekdayDescription: String}): OpeningHourDatas{
        const result = new OpeningHourDatas()
        const descriptionParts = options.weekdayDescription.split(":")

        if(descriptionParts.length < 2)
            throw new Error("Bad description")

        const dayPart = descriptionParts.shift()
        const timePart = descriptionParts.join(":").trim()

        // get day
        result.day = dayPart.trim()

        // parse hours
        result.closeTime = result.openTime = null

        const fullTimeRegex = /24.?\/24$/
        const normalTimeRegex = /([0-9]{2}:[0-9]{2})\s?.?\s?([0-9]{2}:[0-9]{2})$/

        let match
        if(timePart.match(fullTimeRegex)){
            result.openTime = "00"
            result.closeTime = "24"
        }
        else if((match = timePart.match(normalTimeRegex))){
            result.openTime = match[1]
            result.closeTime = match[2]
        }

        return result
    }
}
