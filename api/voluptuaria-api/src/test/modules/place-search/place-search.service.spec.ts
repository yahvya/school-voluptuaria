import { SearchPlaceService } from "../../../modules/search-place/services/search-place.service"
import { GoogleMapsPlaceService } from "../../../modules/google-maps-place/services/google-maps-place.service"
import { OpenWeatherMapService } from "../../../modules/openwheatermap/services/openweathermap.service"
import { Test, TestingModule } from "@nestjs/testing"
import { NotFoundException } from "@nestjs/common"
import { SearchPlaceDatas } from "../../../modules/search-place/data-contracts/search-place-datas"
import { PlaceDatas } from "../../../modules/google-maps-place/data-contracts/place.datas"


describe("SearchPlaceService", () => {
    let googleMapsPlaceService: GoogleMapsPlaceService;
    let openWeatherMapService: OpenWeatherMapService;
    let searchPlaceService: SearchPlaceService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SearchPlaceService,
                {
                    provide: GoogleMapsPlaceService,
                    useValue: {
                        getPlacesDatasBySearch: jest.fn(),
                    },
                },
                {
                    provide: OpenWeatherMapService,
                    useValue: {
                        getMeteoDatas: jest.fn(),
                    },
                },
            ],
        }).compile();

        googleMapsPlaceService = module.get<GoogleMapsPlaceService>(GoogleMapsPlaceService);
        openWeatherMapService = module.get<OpenWeatherMapService>(OpenWeatherMapService);
        searchPlaceService = module.get<SearchPlaceService>(SearchPlaceService);
    });

    it("should be defined", () => {
        expect(searchPlaceService).toBeDefined();
    });

    describe("searchPlace", () => {
        it("should throw NotFoundException if search string is empty", async () => {
            await expect(
                searchPlaceService.searchPlace({
                    searchPlaceData: { research: "", lang: "fr", minRating: 1 },
                }),
            ).rejects.toThrow(NotFoundException);
        });

        it("should throw NotFoundException if lang is empty", async () => {
            await expect(
                searchPlaceService.searchPlace({
                    searchPlaceData: { research: "hotels", lang: "", minRating: 1 },
                }),
            ).rejects.toThrow(NotFoundException);
        });

        it("should throw NotFoundException if minRating is not provided", async () => {
            await expect(
                searchPlaceService.searchPlace({
                    searchPlaceData: { research: "hotels", lang: "fr", minRating: null },
                }),
            ).rejects.toThrow(NotFoundException);
        });

        it("should return search results with weather data", async () => {
            // Mock place data response from GoogleMapsPlaceService
            const mockPlaceData: PlaceDatas[] = [
                {
                    placeName: "Eiffel Tower",
                    coordinate: { latitude: "48.8584", longitude: "2.2945", fullAddress: "Paris, France" },
                    accessId: "123",
                    comments: [],
                    prices: "Free",
                    isOpenedNow: true,
                    images: [],
                    categories: ["landmark"],
                    rating: 4.5,
                } as unknown as PlaceDatas,
            ];

            // Mock weather data response from OpenWeatherMapService
            const mockWeatherData = {
                coordinates: {
                    latitude: "48.8584",
                    longitude: "2.2945",
                },
                forecast: {
                    date: "2024-10-31",
                    temperature: { temperature: "20", feltTemperature: "18", measureUnit: "C" },
                    name: "Clear",
                    sunrise: "07:30",
                    pressure: { pressure: "1013", measureUnit: "hPa" },
                    placeDescription: "Clear sky over Paris",
                    alert: null,
                },
                pressure: { pressure: "1013", measureUnit: "hPa" },
                temperature: { temperature: "20", feltTemperature: "18", measureUnit: "C" },

            };

            jest.spyOn(googleMapsPlaceService, "getPlacesDatasBySearch").mockResolvedValue(mockPlaceData);
            jest.spyOn(openWeatherMapService, "getMeteoDatas").mockResolvedValue(mockWeatherData);

            const searchPlaceData: SearchPlaceDatas = {
                research: "landmarks",
                lang: "fr",
                minRating: 1,
            };

            const response = await searchPlaceService.searchPlace({ searchPlaceData });

            expect(response).toHaveLength(1);
            expect(response[0].place_name).toBe("Eiffel Tower");
            expect(response[0].weather).toEqual(mockWeatherData);
        });

        it("should throw NotFoundException if no places found", async () => {
            jest.spyOn(googleMapsPlaceService, "getPlacesDatasBySearch").mockResolvedValue([]);

            await expect(
                searchPlaceService.searchPlace({
                    searchPlaceData: { research: "unknown", lang: "en", minRating: 5 },
                }),
            ).rejects.toThrow(NotFoundException);
        });

        it("should throw NotFoundException if an error occurs while fetching places", async () => {
            jest.spyOn(googleMapsPlaceService, "getPlacesDatasBySearch").mockRejectedValue(new Error());

            await expect(
                searchPlaceService.searchPlace({
                    searchPlaceData: { research: "hotels", lang: "en", minRating: 1 },
                }),
            ).rejects.toThrow(NotFoundException);
        });
    });
});
