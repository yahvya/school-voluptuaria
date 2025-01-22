import { Injectable } from "@nestjs/common"
import { OpenweathermapDto } from "../data-contracts/openweathermap.dto"
import axios from "axios"
import { LangService } from "../../lang-module/services/lang.service"
import { ConfigService } from "@nestjs/config"

/**
 * Openweathermap api service
 */
@Injectable()
export class OpenweathermapService{
    /**
     * Openweathermap Api base url
     */
    static API_BASE_URL = "https://api.openweathermap.org/data/2.5"

    constructor(
        private readonly langService: LangService,
        private readonly configService: ConfigService
    ) {}

    /**
     * Get weather data from coords
     * @param longitude longitude
     * @param latitude latitude
     * @param lang lang
     * @return {Promise<OpenweathermapDto>} weather data or null on error
     */
    public async getWeatherDataOf(
        {longitude,latitude,lang}:
        {longitude:string,latitude:string,lang:string},
    ):Promise<OpenweathermapDto|null>{
        try{
            if(!this.langService.loadLangFile({langFileName: lang}))
                return null

            const params = {
                lat: latitude,
                lon: longitude,
                appid: this.configService.getOrThrow("API_OPENWEATHERMAP_KEY"),
                exclude: ["minutely","hourly"].join(","),
                units: "standard",
                lang: this.langService.getOpenWeatherMapCode(),
            }

            const response = await axios.get(`${OpenweathermapService.API_BASE_URL}/weather`,{params: params})

            if(response.data === null)
                return null

            const data = new OpenweathermapDto()
            const responseData = response.data

            data.longitude = responseData.coord.lon
            data.latitude = responseData.coord.lat
            data.placeName = responseData.name
            data.placeName = responseData.name
            data.sunrise = new Date(responseData.sys.sunrise)
            data.sunset = new Date(responseData.sys.sunset)
            data.windSpeed = responseData.wind.speed
            data.windDeg = responseData.wind.deg
            data.currentTemperature = responseData.main.temp
            data.currentTemperatureFeelsLike = responseData.main.feels_like
            data.minTemperature = responseData.main.temp_min
            data.maxTemperature = responseData.main.temp_max
            data.pressure = responseData.main.pressure

            return data
        }
        catch (_){
            return null
        }
    }
}
