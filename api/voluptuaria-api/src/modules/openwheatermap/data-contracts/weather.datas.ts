import {ForecastDatas} from "./forecast.datas";
import {PressureDatas} from "./pressure.datas";
import {TemperatureDatas} from "./temperature.datas";
import {OpenWeatherCoordinatesDatas} from "./open-weather-coordinates.datas";

/**
 * @brief place coordinates datas
 */
export class WeatherDatas {
    public coordinates: OpenWeatherCoordinatesDatas

    public forecast: ForecastDatas

    public pressure: PressureDatas

    public temperature: TemperatureDatas
}
