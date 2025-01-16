import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaceCategoryContract } from '../data-contracts/place-category.contract';
import { LikedCategoryEntity } from '../../database-module/entities/liked-category.entity';
import { WishListEntity } from '../../database-module/entities/wish-list.entity';
import { VisitedPlaceEntity } from '../../database-module/entities/visited-place.entity';
import { PlaceCommentEntity } from '../../database-module/entities/place-comment.entity';

@Injectable()
export class CategoryAnalysisService {
    constructor(
        @InjectRepository(LikedCategoryEntity)
        private likedCategoryRepository: Repository<LikedCategoryEntity>,
        @InjectRepository(WishListEntity)
        private wishListRepository: Repository<WishListEntity>,
        @InjectRepository(VisitedPlaceEntity)
        private visitedPlaceRepository: Repository<VisitedPlaceEntity>,
        @InjectRepository(PlaceCommentEntity)
        private placeCommentRepository: Repository<PlaceCommentEntity>
    ) {}

    async analyzeCategoriesForUser(userId: string): Promise<PlaceCategoryContract[]> {
        const categories = new Map<string, PlaceCategoryContract>();

        // Étape 1: Catégories prioritaires
        const likedCategories = await this.likedCategoryRepository.find({
            where: { userId }
        });
        
        likedCategories.forEach(category => {
            categories.set(category.id, {
                id: category.id,
                name: category.name,
                priority: 1,
                source: 'liked',
                score: 1.0
            });
        });

        const wishlistCategories = await this.wishListRepository.find({
            where: { userId }
        });

        wishlistCategories.forEach(wish => {
            if (!categories.has(wish.categoryId)) {
                categories.set(wish.categoryId, {
                    id: wish.categoryId,
                    name: wish.categoryName,
                    priority: 2,
                    source: 'wishlist',
                    score: 0.8
                });
            }
        });

        const visitedPlaces = await this.visitedPlaceRepository.find({
            where: { userId }
        });

        visitedPlaces.forEach(place => {
            if (!categories.has(place.categoryId)) {
                categories.set(place.categoryId, {
                    id: place.categoryId,
                    name: place.categoryName,
                    priority: 3,
                    source: 'visited',
                    score: 0.6
                });
            }
        });

        // Étape 2: Ajuster les scores basés sur les commentaires négatifs
        const negativeComments = await this.placeCommentRepository.find({
            where: { userId, rating: { $lt: 3 } }
        });

        negativeComments.forEach(comment => {
            const category = categories.get(comment.categoryId);
            if (category) {
                category.score *= 0.5; // Réduire le score pour les catégories mal notées
            }
        });

        return Array.from(categories.values())
            .sort((a, b) => a.priority - b.priority || b.score - a.score);
    }
} 