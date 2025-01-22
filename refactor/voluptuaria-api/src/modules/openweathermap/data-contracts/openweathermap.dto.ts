import { ApiResponseProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

/**
 * Openweathermap data contract
 */
export class OpenweathermapDto{
    @ApiResponseProperty()
    public longitude: string

    @ApiResponseProperty()
    public latitude: string

    @ApiResponseProperty()
    public pressure: string

    @ApiResponseProperty()
    @Expose({name: "place_name"})
    public placeName: string

    @ApiResponseProperty()
    public sunrise: Date

    @ApiResponseProperty()
    public sunset: Date

    @ApiResponseProperty()
    @Expose({name: "wind_speed"})
    public windSpeed: number

    @ApiResponseProperty()
    @Expose({name: "wind_deg"})
    public windDeg: number

    @ApiResponseProperty()
    @Expose({name: "current_temperaturr"})
    public currentTemperature: string

    @ApiResponseProperty()
    @Expose({name: "current_temperature_feels_lile"})
    public currentTemperatureFeelsLike: string

    @ApiResponseProperty()
    @Expose({name: "min_temperature"})
    public minTemperature: string

    @ApiResponseProperty()
    @Expose({name: "max_temperature"})
    public maxTemperature: string
}
