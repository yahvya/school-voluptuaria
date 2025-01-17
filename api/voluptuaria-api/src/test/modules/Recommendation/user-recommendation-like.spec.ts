import {
    UserRecommendationLikeService
} from "../../../modules/recommendation/services/user-recommendation-like.service"
import { CategoriesEntity } from "../../../modules/database-module/entities/categories.entity"
import { Repository } from "typeorm"
import { LikedCategoriesEntity } from "../../../modules/database-module/entities/liked-categories.entity"
import { UnLikedCategoriesEntity } from "../../../modules/database-module/entities/unliked-categories.entity"
import { Test } from "@nestjs/testing"
import { getRepositoryToken} from "@nestjs/typeorm"

describe("UserRecommendationLikeService", () => {
    let userRecommendationLikeService: UserRecommendationLikeService;
    let categoriesRepository: Repository<CategoriesEntity>;
    let likedCategoriesRepository: Repository<LikedCategoriesEntity>;
    let unlikedCategoriesRepository: Repository<UnLikedCategoriesEntity>;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({

            providers: [
                UserRecommendationLikeService,
                {
                    provide: getRepositoryToken(CategoriesEntity),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(LikedCategoriesEntity),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(UnLikedCategoriesEntity),
                    useClass: Repository,
                },
            ],
        }).compile();

        userRecommendationLikeService = moduleRef.get<UserRecommendationLikeService>(
            UserRecommendationLikeService,
        );
        categoriesRepository = moduleRef.get<Repository<CategoriesEntity>>(
            getRepositoryToken(CategoriesEntity),
        );
        likedCategoriesRepository = moduleRef.get<Repository<LikedCategoriesEntity>>(
            getRepositoryToken(LikedCategoriesEntity),
        );
        unlikedCategoriesRepository = moduleRef.get<Repository<UnLikedCategoriesEntity>>(
            getRepositoryToken(UnLikedCategoriesEntity),
        );
    });

    describe("userRecommendationLike", () => {
        it("should increment searchFrequency for an existing liked category", async () => {
            const mockCategory = { id: 1, name: "Test Category" };
            const mockLikedCategory = {
                id: 1,
                placeCategoryId: mockCategory.id,
                searchFrequency: 5,
            };

            jest.spyOn(categoriesRepository, "findOneBy").mockResolvedValue(mockCategory as any);
            jest.spyOn(likedCategoriesRepository, "findOneBy").mockResolvedValue(mockLikedCategory as any);
            jest.spyOn(likedCategoriesRepository, "save").mockResolvedValue({
                ...mockLikedCategory,
                searchFrequency: 6,
            } as any);

            const response = await userRecommendationLikeService.userRecommendationLike({
                userRecommendationLikeData: {
                    socialProfile_id: "1",
                    category_name: "Test Category",
                    like: true,
                },
            });

            expect(response.message).toBeNull();
            expect(likedCategoriesRepository.save).toHaveBeenCalledWith({
                ...mockLikedCategory,
                searchFrequency: 6,
            });
        });

        it("should create a new liked category if it does not exist", async () => {
            const mockCategory = { id: 1, name: "New Category" };

            jest.spyOn(categoriesRepository, "findOneBy").mockResolvedValue(mockCategory as any);
            jest.spyOn(likedCategoriesRepository, "findOneBy").mockResolvedValue(null);
            jest.spyOn(likedCategoriesRepository, "create").mockReturnValue({
                socialProfileId: 1,
                placeCategoryId: mockCategory.id,
                searchFrequency: 1,
            } as any);
            jest.spyOn(likedCategoriesRepository, "save").mockResolvedValue({
                id: 2,
                socialProfileId: 1,
                placeCategoryId: mockCategory.id,
                searchFrequency: 1,
            } as any);

            const response = await userRecommendationLikeService.userRecommendationLike({
                userRecommendationLikeData: {
                    socialProfile_id: "1",
                    category_name: "New Category",
                    like: true,
                },
            });

            expect(response.message).toBeNull();
            expect(likedCategoriesRepository.create).toHaveBeenCalledWith({
                socialProfileId: "1",
                placeCategoryId: mockCategory.id,
                searchFrequency: 1,
            });
            expect(likedCategoriesRepository.save).toHaveBeenCalled();
        });

        it("should increment dislikeCount for an existing unliked category", async () => {
            const mockCategory = { id: 1, name: "Unliked Category" };
            const mockUnlikedCategory = {
                id: 1,
                socialProfileId: "1",
                placeCategoryId: mockCategory.id,
                dislikeCount: 3,
            };

            jest.spyOn(categoriesRepository, "findOneBy").mockResolvedValue(mockCategory as any);
            jest.spyOn(unlikedCategoriesRepository, "findOneBy").mockResolvedValue(mockUnlikedCategory as any);
            const saveSpy = jest.spyOn(unlikedCategoriesRepository, "save").mockResolvedValue({
                ...mockUnlikedCategory,
                dislikeCount: 4,
            } as any);

            const response = await userRecommendationLikeService.userRecommendationLike({
                userRecommendationLikeData: {
                    socialProfile_id: "1",
                    category_name: "Unliked Category",
                    like: false,
                },
            });

            expect(response.message).toBeNull();
            expect(categoriesRepository.findOneBy).toHaveBeenCalledWith({ name: "Unliked Category" });
            expect(unlikedCategoriesRepository.findOneBy).toHaveBeenCalledWith({
                socialProfileId: "1",
                placeCategoryId: mockCategory.id,
            });
            expect(saveSpy).toHaveBeenCalledWith({
                ...mockUnlikedCategory,
                dislikeCount: 4,
            });
        });


        it("should create a new unliked category if it does not exist", async () => {
            const mockCategory = { id: 1, name: "New Unliked Category" };

            jest.spyOn(categoriesRepository, "findOneBy").mockResolvedValue(mockCategory as any);
            jest.spyOn(unlikedCategoriesRepository, "findOneBy").mockResolvedValue(null);
            const createcat = jest.spyOn(unlikedCategoriesRepository, "create").mockReturnValue({
                socialProfileId: "1",
                placeCategoryId: mockCategory.id,
                dislikeCount: 1,
            } as any);
            const savecat = jest.spyOn(unlikedCategoriesRepository, "save").mockResolvedValue({
                id: "3",
                socialProfileId: 1,
                placeCategoryId: mockCategory.id,
                dislikeCount: 1,
            } as any);

            const response = await userRecommendationLikeService.userRecommendationLike({
                userRecommendationLikeData: {
                    socialProfile_id: "1",
                    category_name: "New Unliked Category",
                    like: false,
                },
            });

            expect(response.message).toBeNull();
            expect(unlikedCategoriesRepository.create).toHaveBeenCalledWith({
                socialProfileId: "1",
                placeCategoryId: mockCategory.id,
                dislikeCount: 1,
            });
            expect(unlikedCategoriesRepository.save).toHaveBeenCalledWith({
                socialProfileId: "1",
                placeCategoryId: mockCategory.id,
                dislikeCount: 1,
            });
        });
    });
});
