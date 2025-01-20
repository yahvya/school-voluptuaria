import { Injectable } from "@nestjs/common"
import { UserAccountDto } from "../data-contracts/user-account.dto"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import { UserEntity } from "../../database/entities/user.entity"
import { Repository } from "typeorm"

/**
 * Application user account management service
 */
@Injectable()
export class UserAccountService{
    constructor(
       private readonly configurationService: ConfigService,
       @InjectRepository(UserEntity)
       private readonly userRepository: Repository<UserEntity>
    ) {}

    /**
     * Try to find a user form the linked email
     * @param email linked email
     * @return {Promise<UserEntity|null>} promise of the converted account dto or null on error or not found
     */
    public async findUserFromEmail({email}):Promise<UserEntity|null> {
        try{
            const potentielFoundedUser = await this.userRepository.findOneBy({email: email})

            return potentielFoundedUser != null ? potentielFoundedUser : null
        }
        catch (_){
            return null
        }
    }

    /**
     * Create user from the entity
     * @param userEntity user entity
     * @return {Promise<UserEntity|boolean>} insert success or object
     */
    public async createUserFromEntity(
        {userEntity}:
        {userEntity:UserEntity}
    ):Promise<UserEntity|false>{
        try{
            if(await this.userRepository.findOneBy({email: userEntity.email}) !== null)
                return false

            return await this.userRepository.save(userEntity)
        }
        catch (_){
            return false
        }
    }

    /**
     * Update user from the entity
     * @param userEntity user entity
     * @return {Promise<UserEntity,boolean>} update success or object
     */
    public async updateUserFromEntity(
        {userEntity}:
        {userEntity: UserEntity}
    ):Promise<UserEntity|false>{
        try{
            return await this.userRepository.save(userEntity)
        }
        catch (_){
            return false
        }
    }

    /**
     * Convert a user entity to a user account data contract
     * @param userEntity user entity
     * @return {UserAccountDto} created dto
     */
    public fromEntityToDto(
        {userEntity}:
        {userEntity:UserEntity}
    ):UserAccountDto{
        const apiLink :string = this.configurationService.get<string>("API_WEBSITE_LINK")
        const profilePicturesSubLink :string = this.configurationService.get<string>("API_PROFILE_PICTURES_SUB_LINK")

        const profilePictureLink:string = apiLink !== null && profilePicturesSubLink !== null && userEntity.profilePicturePath !== null ? `${apiLink}${profilePicturesSubLink}${userEntity}${profilePicturesSubLink}` : null

        const userAccountDto = new UserAccountDto()
        Object.assign(userAccountDto,{
            id: userEntity.id,
            gender: userEntity.gender,
            accountCreationDate: userEntity.accountCreationDate,
            userName: userEntity.userName,
            userFirstname: userEntity.userFirstname,
            birthdate: userEntity.birthdate,
            email: userEntity.email,
            profilePictureLink: profilePictureLink,
            phoneNumber: userEntity.phoneNumber,
            password: userEntity.password
        })

        return userAccountDto
    }
}
