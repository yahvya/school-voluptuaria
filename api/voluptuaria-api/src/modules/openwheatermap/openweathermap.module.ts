import { Injectable, Module } from "@nestjs/common";
import { CoordinatesDatas } from "../google-maps-place/data-contracts/coordinates.datas";

@Module({})
export class OpenWeatherMapModule {
    private coordinates: CoordinatesDatas | null = null;

    setCoordinates(coordinates: CoordinatesDatas) {
        this.coordinates = new CoordinatesDatas();
        this.coordinates.latitude = coordinates.latitude;
        this.coordinates.longitude = coordinates.longitude;
        this.coordinates.fullAddress = coordinates.fullAddress;
    }

    getCoordinates(): CoordinatesDatas | null {
        return this.coordinates;
    }


}
