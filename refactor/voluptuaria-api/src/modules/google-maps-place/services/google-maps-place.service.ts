import { Injectable } from "@nestjs/common"
import { GoogleMapsPlaceDto } from "../data-contracts/google-maps-place.dto"
import { LangService } from "../../lang-module/services/lang.service"
import axios from "axios"
import { GoogleMapsPlaceOpeningHoursDto } from "../data-contracts/google-maps-place-opening-hours.dto"
import { GoogleMapsPlaceReviewDto } from "../data-contracts/google-maps-place-review.dto"
import { GoogleMapsPlaceAccessibilityDto } from "../data-contracts/google-maps-place-accessibility.dto"
import { GoogleMapsPlaceImageDto } from "../data-contracts/google-maps-place-image.dto"
import { ConfigService } from "@nestjs/config"
import { OpenweathermapService } from "../../openweathermap/services/openweathermap.service"
import { RegisteredPlacesEntity, RegistrablePlaceManager } from "../../database/entities/registered-places.entity"
import { GoogleMapsPlaceIdBuilder } from "../utils/google-maps-place-id-builder"
import { GoogleMapsPlaceLocationBuilder } from "./google-maps-place-location-builder"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { PlaceCategoriesEntity } from "../../database/entities/place-categories.entity"
import { GoogleMapsPlaceCategoriesDto } from "../data-contracts/google-maps-place-categories.dto"

/**
 * Google Maps place service
 */
@Injectable()
export class GoogleMapsPlaceService implements RegistrablePlaceManager{
    constructor(
        private readonly configService:ConfigService,
        private readonly langService:LangService,
        private readonly openweathermapService: OpenweathermapService,
        @InjectRepository(RegisteredPlacesEntity)
        private readonly registeredPlaceRepository: Repository<RegisteredPlacesEntity>,
        @InjectRepository(PlaceCategoriesEntity)
        private readonly placeCategoriesRepository: Repository<PlaceCategoriesEntity>,
    ) {}

    /**
     * Load a place data from id
     * @param accessId access id
     * @param lang lang
     * @return {Promise<GoogleMapsPlaceDto>} response
     */
    public async loadFromId(
        {accessId,lang}:
        {accessId:string,lang:string}
    ):Promise<GoogleMapsPlaceDto|null>{
        try{
            if(!this.langService.loadLangFile({langFileName: lang}))
                return null

            const requestUri = `https://places.googleapis.com/v1/places/${accessId}`
            const apiKey = this.configService.getOrThrow("API_GOOGLE_MAPS_PLACE_API_KEY")

            const response = await axios.get(requestUri,{
                params: {
                    key: apiKey,
                    fields: "*"
                }
            })

            return this.parsePlaceDatas({placeDatas: response.data,lang: lang})
        }
        catch(_){
            return null
        }
    }

    /**
     * Search places from user
     * @param search text search
     * @param lang lang
     * @param minRating min rating
     * @return {Promise<GoogleMapsPlaceDto>} google maps
     */
    public async loadUserTextSearch(
        {search,lang,minRating = 1}:
        {search:string,lang:string,minRating?:number}
    ):Promise<GoogleMapsPlaceDto[]>{
        try{
            if(!this.langService.loadLangFile({langFileName: lang}))
                return []

            const requestUri = "https://places.googleapis.com/v1/places:searchText"
            const headers = {
                "X-Goog-Api-Key": this.configService.getOrThrow("API_GOOGLE_MAPS_PLACE_API_KEY"),
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

            const response = await axios.post(requestUri,body,config)

            const datas = response.data

            if(!("places" in datas))
                throw new Error()

            return datas.places.map(async (place) => await this.parsePlaceDatas({placeDatas: place,lang: lang}))
        }
        catch (_){
            return []
        }
    }

    /**
     * Search elements by  categories
     * @param categories categories to look for
     * @param lang
     * @param minRating
     */
    public async loadByCategories(
        {categories,lang,minRating}:
        {categories:string[],lang:string,minRating:number}
    ):Promise<GoogleMapsPlaceDto[]>{
        return this.loadUserTextSearch({search: categories.join(" or "),lang: lang,minRating: minRating})
    }

    /**
     * Parse place datas
     * @param placeDatas place data
     * @param lang lang
     * @returns {Promise<GoogleMapsPlaceDto>} place datas
     * @throws {Error} on error
     */
    protected async parsePlaceDatas(
        {placeDatas,lang}:
        {placeDatas: Record<string,any>,lang:string}
    ):Promise<GoogleMapsPlaceDto>{
        const resultPlaceDatas = new GoogleMapsPlaceDto()

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

        resultPlaceDatas.categories = placeDatas.types.map(type => {
            console.log(type)
            const categoryDto = new GoogleMapsPlaceCategoriesDto()
            categoryDto.name = type

            return categoryDto
        })

        // comments
        resultPlaceDatas.comments = []

        if("reviews" in placeDatas)
            resultPlaceDatas.comments = placeDatas.reviews.map((review) => this.parseReview({review: review}))

        // images
        resultPlaceDatas.images = []

        const apiKey = this.configService.getOrThrow("API_GOOGLE_MAPS_PLACE_API_KEY")
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
                } as GoogleMapsPlaceImageDto
            });
        }

        // accessibility
        resultPlaceDatas.accessibility = null

        if("accessibilityOptions" in placeDatas){
            resultPlaceDatas.accessibility = new GoogleMapsPlaceAccessibilityDto()

            resultPlaceDatas.accessibility.canAccessParking = "wheelchairAccessibleParking" in placeDatas.accessibilityOptions ? placeDatas.accessibilityOptions.wheelchairAccessibleParking : false
            resultPlaceDatas.accessibility.canAccessEntrance = "wheelchairAccessibleEntrance" in placeDatas.accessibilityOptions ? placeDatas.accessibilityOptions.wheelchairAccessibleEntrance : false
            resultPlaceDatas.accessibility.canAccessRestPlace = "wheelchairAccessibleRestroom" in placeDatas.accessibilityOptions ? placeDatas.accessibilityOptions.wheelchairAccessibleRestroom : false
        }

        resultPlaceDatas.lang = lang

        // load weather data
        resultPlaceDatas.weatherData = await this.openweathermapService.getWeatherDataOf({
            lang: lang,
            longitude: resultPlaceDatas.coordinate.longitude,
            latitude: resultPlaceDatas.coordinate.latitude
        })

        await this.registerEntity({mapsData: resultPlaceDatas})

        return resultPlaceDatas
    }

    /**
     * @brief parse a review datas and convert it to comment datas
     * @param review review
     * @returns {GoogleMapsPlaceReviewDto} datas
     * @throws {Error} error
     */
    protected parseReview(
        {review}:
        {review:Record<string,any>}
    ):GoogleMapsPlaceReviewDto{
        const result = new GoogleMapsPlaceReviewDto()

        result.rating = Math.floor(review.rating)
        if("text" in review)
            result.comment = review.text.text ?? ""
        else
            result.comment = ""

        result.wroteAt = review.publishTime

        return result
    }

    /**
     * Parse a weekday description string and convert it
     * @param weekdayDescription parse weekday description
     * @returns {GoogleMapsPlaceOpeningHoursDto} parsed opening hours
     * @throws {Error} on parse failure
     */
    protected parseWeekdayDescription(
        {weekdayDescription}:
        {weekdayDescription:string}
    ): GoogleMapsPlaceOpeningHoursDto{
        const result = new GoogleMapsPlaceOpeningHoursDto()
        const descriptionParts = weekdayDescription.split(":")

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

    /**
     * Register the provided place if not already registered
     * @param mapsData map data
     * @return {Promise<RegisteredPlacesEntity>} result
     */
    private async registerEntity(
        {mapsData}:
        {mapsData:GoogleMapsPlaceDto}
    ):Promise<RegisteredPlacesEntity|null>{
        try{
            // check if already exist
            const idBuilder = new GoogleMapsPlaceIdBuilder()
            idBuilder.setRequiredData(mapsData)
            const storedFormatInDb = idBuilder.buildIdData()

            const foundedOne = await this.registeredPlaceRepository
                .createQueryBuilder()
                .where("JSON_EXTRACT(id_getter,'$.source') = :source",{"source": storedFormatInDb.source})
                .getOne()

            if(foundedOne !== null)
                return null

            const registeredPlace = new RegisteredPlacesEntity()
            registeredPlace.categories = []

            // save categories in db
            for (const categoryDto of mapsData.categories) {
                const categoryName = categoryDto.name

                // check if category exist and save it in list
                let categoryEntity = await this.placeCategoriesRepository.findOneBy({categoryName: categoryName})

                if(categoryEntity !== null){
                    registeredPlace.categories.push(categoryEntity)
                    continue
                }

                // create the new category
                categoryEntity = new PlaceCategoriesEntity()
                categoryEntity.categoryName = categoryName

                registeredPlace.categories.push(await this.placeCategoriesRepository.save(categoryEntity))
            }

            // create place in db
            const locationBuilder = new GoogleMapsPlaceLocationBuilder()
            locationBuilder.setRequiredData(mapsData)

            registeredPlace.idGetter = storedFormatInDb
            registeredPlace.locationConfig = locationBuilder.buildLocationData()

            return this.registeredPlaceRepository.save(registeredPlace)
        }
        catch (_){
            return null
        }
    }

    generateEntity(fromData: GoogleMapsPlaceDto): RegisteredPlacesEntity {
        const entity = new RegisteredPlacesEntity()
        const idBuilder = new GoogleMapsPlaceIdBuilder()
        const locationBuilder = new GoogleMapsPlaceLocationBuilder()

        idBuilder.setRequiredData(fromData)
        entity.idGetter = idBuilder.buildIdData()

        locationBuilder.setRequiredData(fromData)
        entity.locationConfig = locationBuilder.buildLocationData()

        return entity
    }
}
