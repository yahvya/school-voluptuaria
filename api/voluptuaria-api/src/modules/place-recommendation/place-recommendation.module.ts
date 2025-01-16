import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PlaceRecommendationService } from './services/place-recommendation.service';
import { CategoryAnalysisService } from './services/category-analysis.service';
import { GoogleMapsPlaceModule } from '../google-maps-place/google-maps-place.module';

// Entités nécessaires
import { LikedCategoryEntity } from '../database-module/entities/liked-category.entity';
import { WishListEntity } from '../database-module/entities/wish-list.entity';
import { VisitedPlaceEntity } from '../database-module/entities/visited-place.entity';
import { PlaceCommentEntity } from '../database-module/entities/place-comment.entity';

@Module({
    imports: [
        ConfigModule,
        GoogleMapsPlaceModule,
        TypeOrmModule.forFeature([
            LikedCategoryEntity,
            WishListEntity,
            VisitedPlaceEntity,
            PlaceCommentEntity
        ])
    ],
    providers: [
        PlaceRecommendationService,
        CategoryAnalysisService
    ],
    exports: [
        PlaceRecommendationService,
        CategoryAnalysisService
    ]
})
export class PlaceRecommendationModule {} 