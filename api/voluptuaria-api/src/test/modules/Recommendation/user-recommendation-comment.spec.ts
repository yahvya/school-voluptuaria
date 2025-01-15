import {
    UserRecommendationCommentService
} from "../../../modules/recommendation/services/user-recommendation-comment.service"
import { Repository } from "typeorm"
import { PlacesCommentsEntity } from "../../../modules/database-module/entities/places-comments.entity"
import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { UserCommentsData } from "../../../modules/recommendation/data-contracts/user-comments.data"
import { UserCommentsResponseDatas } from "../../../modules/recommendation/data-contracts/user-comments-response.datas"


describe("UserRecommendationCommentService", () => {
    let service: UserRecommendationCommentService;
    let repositoryMock: jest.Mocked<Repository<PlacesCommentsEntity>>;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UserRecommendationCommentService,
                {
                    provide: getRepositoryToken(PlacesCommentsEntity),
                    useValue: {
                        save: jest.fn()
                    },
                },
            ],
        }).compile();

        service = moduleRef.get(UserRecommendationCommentService);
        repositoryMock = moduleRef.get(getRepositoryToken(PlacesCommentsEntity));
    });

    describe("userRecommendationComment", () => {
        it("should save a valid user comment and return a success message", async () => {
            const userCommentsData: UserCommentsData = {
                user_id: "123",
                place_id: "456",
                comment: "Great place!",
                wroteAt: "2024-12-09T10:00:00Z",
            };

            repositoryMock.save.mockResolvedValue({
                userId: userCommentsData.user_id,
                placeId: userCommentsData.place_id,
                comment: userCommentsData.comment,
                commentedAt: userCommentsData.wroteAt,
            });

            const result = await service.userRecommendationComment({ userCommentsDatas: userCommentsData });

            expect(repositoryMock.save).toHaveBeenCalledWith({
                userId: userCommentsData.user_id,
                placeId: userCommentsData.place_id,
                comment: userCommentsData.comment,
                commentedAt: userCommentsData.wroteAt,
            });
            expect(result).toBeInstanceOf(UserCommentsResponseDatas);
            expect(result.message).toBe("OK");
        });

        it("should throw an error if any field is missing", async () => {
            const invalidData: Partial<UserCommentsData> = {
                user_id: "123",
                place_id: "456",
            };

            await expect(
                service.userRecommendationComment({ userCommentsDatas: invalidData as UserCommentsData }),
            ).rejects.toThrowError("Information not completed");
        });

        it("should throw an error if repository save fails", async () => {
            const userCommentsData: UserCommentsData = {
                user_id: "123",
                place_id: "456",
                comment: "Great place!",
                wroteAt: "2024-12-09T10:00:00Z",
            };

            repositoryMock.save.mockRejectedValue(new Error("Database error"));

            await expect(
                service.userRecommendationComment({ userCommentsDatas: userCommentsData }),
            ).rejects.toThrowError("Database error");
        });
    });
});
