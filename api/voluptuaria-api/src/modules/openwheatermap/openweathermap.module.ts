import { Module } from "@nestjs/common";
import {OpenWeatherMapService} from "./services/openweathermap.service";

/**
 * @brief openweathermap api module
 */
@Module({
    providers: [OpenWeatherMapService],
    exports: [OpenWeatherMapService]
})
export class OpenWeatherMapModule {

}
