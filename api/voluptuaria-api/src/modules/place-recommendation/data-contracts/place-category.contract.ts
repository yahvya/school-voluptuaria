export interface PlaceCategoryContract {
    id: string;
    name: string;
    priority: number;
    source: 'liked' | 'wishlist' | 'visited' | 'google';
    score: number;
}

export interface PlaceRecommendationFilters {
    startDate: Date;
    endDate: Date;
    budget: number;
    location: {
        lat: number;
        lng: number;
        radius?: number; // en mètres
    };
}

export interface RecommendedPlace {
    id: string;
    name: string;
    category: string;
    location: {
        lat: number;
        lng: number;
        address: string;
    };
    rating: number;
    priceLevel: number; // 1-4
    photos?: string[];
    openingHours?: {
        [key: string]: string;
    };
    type: 'attraction' | 'restaurant';
}

export interface DailyRecommendation {
    date: Date;
    attraction: RecommendedPlace;
    restaurant: RecommendedPlace;
    totalCost: number;
}

export interface PlaceRecommendationResult {
    recommendations: DailyRecommendation[];
    totalBudget: number;
    categories: PlaceCategoryContract[];
} 