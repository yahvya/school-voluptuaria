import { Controller, Get, HttpCode, Query } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import { UserEntity,Gender } from "src/modules/database-module/entities/user.entity"
import { UserLoginService } from "src/modules/user/services/user-login.service"
import { Repository } from "typeorm"
import * as fs from "node:fs"
import { EncryptService } from "src/modules/app-security/services/encrypt.service"
import { HashService } from "src/modules/app-security/services/hash.service"
import { InstagramScrapingService } from "src/modules/instagram-module/services/instagram-scraping.service"
import { PlaceRecommendationService } from "src/modules/place-recommendation/services/place-recommendation.service"

@Controller("test")
export class TestController {
    constructor(
        @InjectRepository(UserEntity)
        protected readonly userRepository: Repository<UserEntity>,
        protected readonly userLoginService: UserLoginService,
        protected readonly configService: ConfigService,
        protected readonly encryptService: EncryptService,
        protected readonly hashService: HashService,
        protected readonly instagramScrapingService: InstagramScrapingService,
        protected readonly placeRecommendationService: PlaceRecommendationService
    ){
    }

    @Get()
    @HttpCode(200)
    public list(){
        return {
            "/" : "Fourni la liste des routes de tests ainsi que leurs description",
            "/init" : "Initialise les requis du projet pour tester (base de données, tokens et configurations ...)",
            "/instagram-scraping": "Test le scraping d'un profil Instagram (utiliser ?username=nom_utilisateur)",
            "/place-recommendation": "Test les recommandations de lieux (utiliser ?userId=id_utilisateur)",
            "/place-recommendation/categories": "Test l'analyse des catégories (utiliser ?userId=id_utilisateur)"
        }
    }

    @Get("init")
    @HttpCode(200)
    public async init(){
        // clear databases and folders
        await this.userRepository.delete({})

        const userProfilePicturesDirectoryPath = this.configService.getOrThrow("USERS_PROFILE_PICTURES")
        fs.rmSync(userProfilePicturesDirectoryPath,{ recursive: true })
        fs.mkdirSync(userProfilePicturesDirectoryPath)

        // create a test account
        await this.userRepository.save({
            name: "Test name",
            firstName: "Test firstname",
            email: "voluptuaria.tourisma@gmail.com",
            password: await this.hashService.hash({
                toHash: "Test@@14_",
                salt: 10
            }),
            gender: Gender.MAN
        })

        // generate configs
        const voluptuariaTokenEncryptResult = await this.encryptService.encrypt({
            toEncrypt: this.configService.getOrThrow("API_SECRET"),
            secretKey: this.configService.getOrThrow("API_TOKEN_SECRET")
        })

        // Ajouter des données de test pour les recommandations de lieux
        const testUserId = "test-user-id";

        // Catégories aimées
        await this.likedCategoryRepository.save([
            {
                id: "cat-1",
                userId: testUserId,
                name: "Musée",
                createdAt: new Date()
            },
            {
                id: "cat-2",
                userId: testUserId,
                name: "Restaurant",
                createdAt: new Date()
            }
        ]);

        // Liste de souhaits
        await this.wishListRepository.save([
            {
                id: "wish-1",
                userId: testUserId,
                categoryId: "cat-3",
                categoryName: "Parc d'attractions",
                createdAt: new Date()
            }
        ]);

        // Lieux visités
        await this.visitedPlaceRepository.save([
            {
                id: "visit-1",
                userId: testUserId,
                categoryId: "cat-4",
                categoryName: "Théâtre",
                visitDate: new Date(),
                createdAt: new Date()
            }
        ]);

        // Commentaires sur les lieux
        await this.placeCommentRepository.save([
            {
                id: "comment-1",
                userId: testUserId,
                placeId: "place-1",
                categoryId: "cat-5",
                rating: 2,
                comment: "Pas terrible",
                createdAt: new Date()
            }
        ]);

        return {
            "testAccountCredentials": {
                "email": "voluptuaria.tourisma@gmail.com",
                "password": "Test@@14_",
                "authenticationToken": this.userLoginService.generateToken({
                    email: "voluptuaria.tourisma@gmail.com"
                })
            },
            "voluptuariaAccessConfigAsString": {
                token: voluptuariaTokenEncryptResult.encryptionResult,
                iv: voluptuariaTokenEncryptResult.iv
            },
            "testPlaceRecommendationData": {
                "userId": testUserId,
                "sampleFilters": {
                    "startDate": new Date(),
                    "endDate": new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 jours
                    "budget": 1000,
                    "location": {
                        "lat": 48.8566,
                        "lng": 2.3522,
                        "radius": 5000
                    }
                }
            }
        }
    }

    @Get("instagram-scraping")
    @HttpCode(200)
    public async testInstagramScraping(
        @Query('username') username: string = 'pascalthetrlol'
    ) {
        try {
            console.log(`Début du scraping pour le profil: ${username}`);
            const result = await this.instagramScrapingService.scrapeInstagramProfile(username);
            
            return {
                success: true,
                data: result,
                metadata: {
                    totalPosts: result.profile.totalPosts,
                    analyzedPosts: result.profile.analyzedPosts,
                    scrapingTime: new Date().toISOString()
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                metadata: {
                    username,
                    timestamp: new Date().toISOString()
                }
            };
        }
    }

    @Get("place-recommendation")
    @HttpCode(200)
    public async testPlaceRecommendation(
        @Query('userId') userId: string = 'test-user-id'
    ) {
        try {
            const filters = {
                startDate: new Date(),
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                budget: 1000,
                location: {
                    lat: 48.8566,
                    lng: 2.3522,
                    radius: 5000
                }
            };

            console.log(`Début des recommandations pour l'utilisateur: ${userId}`);
            const result = await this.placeRecommendationService.getRecommendations(userId, filters);
            
            return {
                success: true,
                data: result,
                metadata: {
                    userId,
                    filters,
                    recommendationTime: new Date().toISOString()
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                metadata: {
                    userId,
                    timestamp: new Date().toISOString()
                }
            };
        }
    }

    @Get("place-recommendation/categories")
    @HttpCode(200)
    public async testCategoryAnalysis(
        @Query('userId') userId: string = 'test-user-id'
    ) {
        try {
            console.log(`Analyse des catégories pour l'utilisateur: ${userId}`);
            const result = await this.categoryAnalysisService.analyzeCategoriesForUser(userId);
            
            return {
                success: true,
                data: result,
                metadata: {
                    userId,
                    analysisTime: new Date().toISOString()
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                metadata: {
                    userId,
                    timestamp: new Date().toISOString()
                }
            };
        }
    }
}
