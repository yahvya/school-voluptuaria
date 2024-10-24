import {Injectable} from "@nestjs/common";
import {OpenWeatherCoordinatesDatas} from "../data-contracts/open-weather-coordinates.datas";
import {WeatherDatas} from "../data-contracts/weather.datas";
import axios from "axios"
import {ForecastDatas} from "../data-contracts/forecast.datas";
import {PressureDatas} from "../data-contracts/pressure.datas";

@Injectable()
export class OpenWeatherMapService {
    public async getMeteoDatas(options: {coordinates: OpenWeatherCoordinatesDatas}):Promise<WeatherDatas> {
        const params = {
            lat: options.coordinates.latitude,
            lon: options.coordinates.longitude,
            appid: process.env.OPENWEATHER_API_KEY,
            units: "metric",
            lang: "fr"
        }
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather",{
            params: params
        })

        const weather = new WeatherDatas()

        weather.pressure = {
            pressure: response.data.main.pressure,
            measureUnit: 'Pascal'
        }

        weather.temperature = {
            temperature: response.data.main.temp,
            feltTemperature: response.data.main.feels_like,
            measureUnit: 'Celsius'
        }

        weather.forecast = {
            date: response.data.dt,
            temperature: weather.temperature,
            name: response.data.name,
            sunrise: response.data.sys.sunrise,
            pressure: weather.pressure,
            placeDescription: response.data.weather[0].description,
            alert: response.data.weather[0].main
        }

        weather.coordinates = options.coordinates

        return weather

    }
}
