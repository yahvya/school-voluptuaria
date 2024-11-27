import { Controller, Get, HttpCode } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import { UserEntity,Gender } from "src/modules/database-module/entities/user.entity"
import { UserLoginService } from "src/modules/user/services/user-login.service"
import { Repository } from "typeorm"
import * as fs from "node:fs"
import { EncryptService } from "src/modules/app-security/services/encrypt.service"
import { HashService } from "src/modules/app-security/services/hash.service"

@Controller("test")
export class TestController {
    constructor(
        @InjectRepository(UserEntity)
        protected readonly userRepository: Repository<UserEntity>,
        protected readonly userLoginService: UserLoginService,
        protected readonly configService: ConfigService,
        protected readonly encryptService: EncryptService,
        protected readonly hashService: HashService
    ){
    }

    @Get()
    @HttpCode(200)
    public list(){
        return {
            "/" : "Fourni la liste des routes de tests ainsi que leurs description",
            "/init" : "Initialise les requis du projet pour tester (base de données, tokens et configurations ...)"
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
        }
    }
}
