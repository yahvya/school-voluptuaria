import { Test, TestingModule } from '@nestjs/testing';
import { OpenWeatherMapService } from '../../../modules/openwheatermap/services/openweathermap.service';


describe('OpenWeatherMapService', () => {
    let service: OpenWeatherMapService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OpenWeatherMapService],
        }).compile();

        service = module.get<OpenWeatherMapService>(OpenWeatherMapService);
    });

    test.each(
        [
            {latitude: '48.8582', longitude: '2.3387'},
            {latitude: '40.7128', longitude: '-74.0060'},
            {latitude: '34.0522', longitude: '-118.2437'},
            {latitude: '51.5074', longitude: '-0.1278'},
            {latitude: '35.6895', longitude: '139.6917'},
            {latitude: '55.7558', longitude: '37.6173'},
            {latitude: '37.7749', longitude: '-122.4194'},
            {latitude: '52.5200', longitude: '13.4050'},
            {latitude: '41.9028', longitude: '12.4964'},
            {latitude: '-33.8688', longitude: '151.2093'},
            {latitude: '', longitude: ''}
        ]
    )('Should return weather data', async (coords) => {
        const result = expect(async () => {
            const {coordinates, pressure, temperature, forecast} = await service.getMeteoDatas({coordinates: coords})
            expect(coordinates.latitude).toBe(coords.latitude)
            expect(coordinates.longitude).toBe(coords.longitude)
            expect(pressure.pressure).toBeDefined()
            expect(pressure.measureUnit).toBeDefined()
            const temperatureRegex = /[0-9]+\.?[0-9]*/
            expect(temperature.temperature).toBeDefined()
            expect(temperature.temperature).toMatch(temperatureRegex)
            expect(temperature.feltTemperature).toBeDefined()
            expect(temperature.feltTemperature).toMatch(temperatureRegex)
            expect(temperature.measureUnit).toBeDefined()
            expect(forecast.pressure.pressure).toBeDefined()
            expect(forecast.pressure.measureUnit).toBeDefined()
            expect(forecast.name).toBeDefined()
            expect(forecast.sunrise).toBeDefined()
            expect(forecast.date).toBeDefined()
            expect(forecast.placeDescription).toBeDefined()

        })
        result.not.toThrow()
    })

    test.each(
        [
            {latitude: '', longitude: ''},
            {latitude: '51.5074', longitude: ''},
            {latitude: '', longitude: '-0.1278'},
        ]
    )('Should return exception', async (coords) => {
        expect(async () => {
            await service.getMeteoDatas({coordinates: coords})
        }).toThrow()
    })

});
