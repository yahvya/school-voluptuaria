import { ApiResponseProperty } from "@nestjs/swagger"

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
    public placeName: string

    @ApiResponseProperty()
    public sunrise: Date

    @ApiResponseProperty()
    public sunset: Date

    @ApiResponseProperty()
    public windSpeed: number

    @ApiResponseProperty()
    public windDeg: number

    @ApiResponseProperty()
    public currentTemperature: string

    @ApiResponseProperty()
    public currentTemperatureFeelsLike: string

    @ApiResponseProperty()
    public minTemperature: string

    @ApiResponseProperty()
    public maxTemperature: string
}
