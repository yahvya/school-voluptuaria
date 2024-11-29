import {SimpleTravelRouteService} from "../../../modules/recommendation/services/simple-travel-route.sevice"
import { Repository } from "typeorm"
import { TravelRoutesEntity } from "../../../modules/database-module/entities/travel-routes.entity"
import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { PriceDatas } from "../../../modules/google-maps-place/data-contracts/price.datas"
import { CoordinatesDatas } from "../../../modules/google-maps-place/data-contracts/coordinates.datas"
import { CategoriesDatas } from "../../../modules/google-maps-place/data-contracts/categories.datas"
import { PlaceComments } from "../../../modules/recommendation/data-contracts/place-comments.datas"
import { OpenWeatherCoordinatesDatas } from "../../../modules/openwheatermap/data-contracts/open-weather-coordinates.datas"
import { TemperatureDatas } from "../../../modules/openwheatermap/data-contracts/temperature.datas"
import { PressureDatas } from "../../../modules/openwheatermap/data-contracts/pressure.datas"
import { ForecastDatas } from "../../../modules/openwheatermap/data-contracts/forecast.datas"
import { WeatherDatas } from "../../../modules/openwheatermap/data-contracts/weather.datas"
import { RecommandationsDatas } from "../../../modules/recommendation/data-contracts/recommandations.datas"
import {
    SimpleTravelRouteResponseDatas
} from "../../../modules/recommendation/data-contracts/simple-travel-route-response.datas"


describe('SimpleTravelRouteService', () => {
    let service: SimpleTravelRouteService;
    let travelRouteRepository: Repository<TravelRoutesEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SimpleTravelRouteService,
                {
                    provide: getRepositoryToken(TravelRoutesEntity),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<SimpleTravelRouteService>(SimpleTravelRouteService);
        travelRouteRepository = module.get<Repository<TravelRoutesEntity>>(getRepositoryToken(TravelRoutesEntity));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('saveTravelRoute', () => {
        it('should save a travel route successfully', async () => {
            const saveSpy = jest.spyOn(travelRouteRepository, 'save').mockResolvedValue({} as TravelRoutesEntity);

            const options = {
                simpleTravelRouteResponseDatas: {
                    budget: 1000,
                    start_date: '2024-10-31',
                    end_date : '2024-10-31',
                    callback_datas : null,
                    proposals: [{
                        prices: [
                            { price: 100, currency: 'USD' } as PriceDatas
                        ],
                        name: 'Eiffel Tower',
                        is_opened_now: true,
                        images: ['image1.jpg'],
                        coordinates: {
                            latitude: '48.8584',
                            longitude: '2.2945',
                            fullAddress: 'Champ de Mars, Paris, France'
                        } as CoordinatesDatas,
                        categories: [{ name: 'landmark' } as CategoriesDatas],
                        callback_datas: {},
                        comments: [] as PlaceComments[],
                        weather: [
                            {
                                coordinates: {
                                    latitude: '48.8584',
                                    longitude: '2.2945'
                                } as OpenWeatherCoordinatesDatas,
                                forecast: {
                                    date: '2024-10-31',
                                    temperature: { temperature: '20', feltTemperature: '18', measureUnit: 'C' } as TemperatureDatas,
                                    name: 'Clear',
                                    sunrise: '07:30',
                                    pressure: { pressure: '1013', measureUnit: 'hPa' } as PressureDatas,
                                    placeDescription: 'Clear sky over Paris',
                                    alert: null
                                } as ForecastDatas,
                                pressure: { pressure: '1013', measureUnit: 'hPa' } as PressureDatas,
                                temperature: { temperature: '20', feltTemperature: '18', measureUnit: 'C' } as TemperatureDatas
                            } as WeatherDatas
                        ]
                    } as RecommandationsDatas],
                } as SimpleTravelRouteResponseDatas,
                name: 'Test Route',
                userId: 'user-id-123',
            };

            await service.saveTravelRoute(options);

            expect(saveSpy).toHaveBeenCalledWith({
                userId: options.userId,
                routeName: options.name,
                start_date: options.simpleTravelRouteResponseDatas.start_date,
                end_date: options.simpleTravelRouteResponseDatas.end_date,
                budget: options.simpleTravelRouteResponseDatas.budget,
                proposals: options.simpleTravelRouteResponseDatas.proposals,
            });
        });

        it('should throw an error if any required field is missing', async () => {
            const options = {
                simpleTravelRouteResponseDatas: {
                    budget: null,
                    start_date: '2024-10-31',
                    end_date: '2024-10-31',
                    proposals: [{
                        prices: [
                            { price: 100, currency: 'USD' } as PriceDatas
                        ],
                        name: 'Eiffel Tower',
                        is_opened_now: true,
                        images: ['image1.jpg'],
                        coordinates: {
                            latitude: '48.8584',
                            longitude: '2.2945',
                            fullAddress: null
                        } as CoordinatesDatas,
                        categories: [{ name: 'landmark' } as CategoriesDatas],
                        callback_datas: {},
                        comments: [] as PlaceComments[],
                        weather: [
                            {
                                coordinates: {
                                    latitude: '48.8584',
                                    longitude: '2.2945'
                                } as OpenWeatherCoordinatesDatas,
                                forecast: {
                                    date: '2024-10-31',
                                    temperature: { temperature: '20', feltTemperature: '18', measureUnit: 'C' } as TemperatureDatas,
                                    name: 'Clear',
                                    sunrise: '07:30',
                                    pressure: { pressure: '1013', measureUnit: 'hPa' } as PressureDatas,
                                    placeDescription: 'Clear sky over Paris',
                                    alert: null
                                } as ForecastDatas,
                                pressure: { pressure: '1013', measureUnit: 'hPa' } as PressureDatas,
                                temperature: { temperature: '20', feltTemperature: '18', measureUnit: 'C' } as TemperatureDatas
                            } as WeatherDatas,
                        ]
                    } as RecommandationsDatas],
                } as SimpleTravelRouteResponseDatas,
                name: 'Test Route',
                userId: 'user-id-123',
            };

            await expect(service.saveTravelRoute(options)).rejects.toThrow(Error);
        });
    });

    /* describe('getTravelRouteByUserId', () => {
        it('should return travel routes for a specific user', async () => {
            const mockTravelRoutes = [
                {
                    id: 1,
                    routeName: 'Test Route 1',
                    startDate: new Date('2024-01-01'),
                    endDate: new Date('2024-01-10'),
                    budget: 1500.00,
                    proposals: [
                        {
                            prices: [{ price: 300, currency: 'USD' }],
                            name: 'Statue of Liberty',
                            is_opened_now: true,
                            images: ['image2.jpg'],
                            coordinates: {
                                latitude: '40.6892',
                                longitude: '-74.0445',
                                fullAddress: 'Liberty Island, New York, NY 10004, USA'
                            },
                            categories: [{ name: 'landmark' }],
                            callback_datas: {},
                            comments: [],
                            weather: [
                                {
                                    coordinates: {
                                        latitude: '40.6892',
                                        longitude: '-74.0445'
                                    },
                                    forecast: {
                                        date: '2024-01-01',
                                        temperature: { temperature: '5', feltTemperature: '3', measureUnit: 'C' },
                                        name: 'Cloudy',
                                        sunrise: '07:15',
                                        pressure: { pressure: '1012', measureUnit: 'hPa' },
                                        placeDescription: 'Cloudy sky over NYC',
                                        alert: null
                                    },
                                    pressure: { pressure: '1012', measureUnit: 'hPa' },
                                    temperature: { temperature: '5', feltTemperature: '3', measureUnit: 'C' }
                                }
                            ]
                        }
                    ],
                    userId: 'user-id-123',
                    user: {
                        id: 'user-id-124',
                        email: 'example2@test.com',
                        password: 'hashedPassword2',
                        name: 'Smith',
                        firstName: 'Jane',
                        birthdate: new Date('1985-05-15'),
                        phonenumber: '555-5678',
                        profilePictureLink: 'profile2.jpg',
                        createdAt: new Date(),
                        gender: 2 // Gender.WOMAN
                    } as UserEntity
                },
                {
                    id: 2,
                    routeName: 'Test Route 2',
                    startDate: new Date('2024-02-15'),
                    endDate: new Date('2024-02-20'),
                    budget: 800.00,
                    proposals: [
                        {
                            prices: [{ price: 150, currency: 'USD' }],
                            name: 'Central Park',
                            is_opened_now: true,
                            images: ['image3.jpg'],
                            coordinates: {
                                latitude: '40.785091',
                                longitude: '-73.968285',
                                fullAddress: 'New York, NY, USA'
                            },
                            categories: [{ name: 'park' }],
                            callback_datas: {},
                            comments: [],
                            weather: [
                                {
                                    coordinates: {
                                        latitude: '40.785091',
                                        longitude: '-73.968285'
                                    },
                                    forecast: {
                                        date: '2024-02-15',
                                        temperature: { temperature: '0', feltTemperature: '-2', measureUnit: 'C' },
                                        name: 'Snowy',
                                        sunrise: '06:50',
                                        pressure: { pressure: '1008', measureUnit: 'hPa' },
                                        placeDescription: 'Snowy day in NYC',
                                        alert: null
                                    },
                                    pressure: { pressure: '1008', measureUnit: 'hPa' },
                                    temperature: { temperature: '0', feltTemperature: '-2', measureUnit: 'C' }
                                }
                            ]
                        }
                    ],
                    userId: 'user-id-123',
                    user: {
                        id: 'user-id-123',
                        email: 'example1@test.com',
                        password: 'hashedPassword1',
                        name: 'Doe',
                        firstName: 'John',
                        birthdate: new Date('1990-01-01'),
                        phonenumber: '555-1234',
                        profilePictureLink: 'profile1.jpg',
                        createdAt: new Date(),
                        gender: 1 // Gender.MAN
                    } as UserEntity

                }
            ];
            const findSpy = jest.spyOn(travelRouteRepository, 'findBy').mockResolvedValue(mockTravelRoutes as TravelRoutesEntity[]);

            const result = await service.getTravelRouteByUserId('user-id-123');

            expect(findSpy).toHaveBeenCalledWith({ userId: 'user-id-123'});
            expect(result).toEqual(mockTravelRoutes.filter(route => route.userId === 'user-id-123'));
        });

        it('should throw BadRequestException if userId is null or undefined', async () => {
            await expect(service.getTravelRouteByUserId(null)).rejects.toThrow(BadRequestException);
            await expect(service.getTravelRouteByUserId(undefined)).rejects.toThrow(BadRequestException);
        });
    });*/
});
