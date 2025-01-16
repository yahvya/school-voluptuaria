import { Injectable } from '@nestjs/common';
import { CategoryAnalysisService } from './category-analysis.service';
import { GoogleMapsPlaceService } from '../../google-maps-place/services/google-maps-place.service';
import { 
    PlaceRecommendationFilters, 
    PlaceRecommendationResult,
    DailyRecommendation,
    RecommendedPlace,
    PlaceCategoryContract
} from '../data-contracts/place-category.contract';

@Injectable()
export class PlaceRecommendationService {
    constructor(
        private readonly categoryAnalysisService: CategoryAnalysisService,
        private readonly googleMapsPlaceService: GoogleMapsPlaceService
    ) {}

    async getRecommendations(
        userId: string,
        filters: PlaceRecommendationFilters
    ): Promise<PlaceRecommendationResult> {
        // 1. Analyser les catégories préférées
        const categories = await this.categoryAnalysisService.analyzeCategoriesForUser(userId);

        // 2. Calculer le nombre de jours
        const days = Math.ceil(
            (filters.endDate.getTime() - filters.startDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        // 3. Budget quotidien
        const dailyBudget = filters.budget / days;

        // 4. Générer les recommandations quotidiennes
        const recommendations: DailyRecommendation[] = [];
        let currentDate = new Date(filters.startDate);

        for (let i = 0; i < days; i++) {
            const dailyRecommendation = await this.generateDailyRecommendation(
                categories,
                filters.location,
                dailyBudget,
                currentDate
            );

            recommendations.push(dailyRecommendation);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return {
            recommendations,
            totalBudget: filters.budget,
            categories
        };
    }

    private async generateDailyRecommendation(
        categories: PlaceCategoryContract[],
        location: { lat: number; lng: number },
        dailyBudget: number,
        date: Date
    ): Promise<DailyRecommendation> {
        // Utiliser les catégories prioritaires pour trouver une attraction
        const topCategory = categories[0];
        const attraction = await this.findPlaceByCategory(topCategory, location, dailyBudget * 0.6, 'attraction');

        // Trouver un restaurant à proximité
        const restaurant = await this.findPlaceByCategory(
            { id: 'restaurant', name: 'restaurant', priority: 1, source: 'google', score: 1 },
            location,
            dailyBudget * 0.4,
            'restaurant'
        );

        return {
            date,
            attraction,
            restaurant,
            totalCost: dailyBudget
        };
    }

    private async findPlaceByCategory(
        category: PlaceCategoryContract,
        location: { lat: number; lng: number },
        maxBudget: number,
        type: string
    ): Promise<RecommendedPlace> {
        const searchResult = await this.googleMapsPlaceService.searchNearbyPlaces({
            location: {
                latitude: location.lat,
                longitude: location.lng
            },
            radius: 5000,
            type,
            keyword: category.name
        });

        if (!searchResult.success) {
            throw new Error(`Erreur lors de la recherche de lieux: ${searchResult.error}`);
        }

        // Filtrer par budget et noter les lieux
        const filteredPlaces = searchResult.places
            .filter(place => this.estimateCost(place) <= maxBudget)
            .sort((a, b) => (b.rating || 0) - (a.rating || 0));

        if (filteredPlaces.length === 0) {
            throw new Error(`Aucun lieu trouvé pour la catégorie ${category.name} dans le budget`);
        }

        const placeDetails = await this.googleMapsPlaceService.getPlaceDetails({
            placeId: filteredPlaces[0].placeId
        });

        if (!placeDetails.success) {
            throw new Error(`Erreur lors de la récupération des détails du lieu: ${placeDetails.error}`);
        }

        return this.mapToRecommendedPlace(placeDetails.place, type);
    }

    private mapToRecommendedPlace(place: any, type: string): RecommendedPlace {
        return {
            id: place.placeId,
            name: place.name,
            category: type,
            location: {
                lat: place.location.latitude,
                lng: place.location.longitude,
                address: place.formattedAddress || place.vicinity || ''
            },
            rating: place.rating || 0,
            priceLevel: place.priceLevel || 1,
            photos: place.photos || [],
            openingHours: place.openingHours?.reduce((acc, period) => {
                acc[period.day] = `${period.openTime}-${period.closeTime}`;
                return acc;
            }, {}),
            type
        };
    }

    private estimateCost(place: any): number {
        const baseCost = {
            1: 20,
            2: 50,
            3: 100,
            4: 200
        };
        return baseCost[place.priceLevel] || 30;
    }
} 