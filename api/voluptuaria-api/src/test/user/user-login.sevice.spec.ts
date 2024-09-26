import {UserLoginService} from "../../modules/user/services/user-login.service";
import {Repository} from "typeorm";
import {UserEntity} from "../../modules/database-module/entities/user.entity";
import {JwtService} from "@nestjs/jwt";
import {getRepositoryToken} from "@nestjs/typeorm";
import {UserLoginDatas} from "../../modules/user/data-contracts/user-login-datas";
import * as bcrypt from 'bcrypt';
import {Test, TestingModule} from "@nestjs/testing";


describe('UserLoginService', () => {
    let service: UserLoginService;
    let userRepository: Repository<UserEntity>;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserLoginService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useClass: Repository,  // Mock for TypeORM Repository
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('fake-jwt-token'),
                    },
                },

            ],
        }).compile();

        service = module.get<UserLoginService>(UserLoginService);
        userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
        jwtService = module.get<JwtService>(JwtService);
    });


    it('should return a valid token if login is successful', async () => {
        const userLoginDatas: UserLoginDatas = {
            email: 'test@example.com',
            password: 'testpassword',
        };

        const mockUser = {
            id: "1",
            email: 'test@example.com',
            password: await bcrypt.hash('testpassword', 10), // Haché pour le test
            name: 'svel',
            firstName: 'vaprez',
            birthdate: new Date(),
            createdAt: new Date(),
            phonenumber: '1234567890',
            gender: 1,
            profilePictureLink: 'https://svel.com',
        };

        // Mock des méthodes
        jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser);
        jest.spyOn(bcrypt, 'compare').mockImplementation((password: string, hashedPassword: string): Promise<boolean> => {
            return Promise.resolve(true); // Resolve with true for successful match
        });// Le mot de passe est valide
        jest.spyOn(jwtService, 'sign').mockReturnValue('validToken'); // Mock du token

        const result = await service.login({userLoginDatas});

        expect(result.authenticationToken).toEqual('validToken');
        expect(result.errorMessage).toBeUndefined();
    });

    // Cas de test pour un email non trouvé
    it('should return an error if the email is not found', async () => {
        const userLoginDatas: UserLoginDatas = {
            email: 'unknown@example.com',
            password: 'testpassword',
        };

        jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null); // Utilisateur non trouvé

        const result = await service.login({userLoginDatas});

        expect(result.errorMessage).toEqual('error.unrecognized-email-password');
        expect(result.authenticationToken).toBeUndefined();
    });

    // Cas de test pour un mot de passe incorrect
    it('should return an error if the password is incorrect', async () => {
        const userLoginDatas: UserLoginDatas = {
            email: 'test@example.com',
            password: 'wrongpassword',
        };

        const mockUser = {
            id: "1",
            email: 'test@example.com',
            password: await bcrypt.hash('testpassword', 10), // Haché pour le test
            name: 'svel',
            firstName: 'vaprez',
            birthdate: new Date(),
            createdAt: new Date(),
            phonenumber: '1234567890',
            gender: 1,
            profilePictureLink: 'https://svel.com',
        };

        jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser);
        jest.spyOn(bcrypt, 'compare').mockImplementation((password: string, hashedPassword: string): Promise<boolean> => {
            return Promise.resolve(false); // Resolve with true for successful match
        }); // Mot de passe incorrect

        const result = await service.login({userLoginDatas});

        expect(result.errorMessage).toEqual('error.unrecognized-email-password');
        expect(result.authenticationToken).toBeUndefined();
    });
});
