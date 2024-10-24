/**
 * @brief Edit password service
 */
import { InjectRepository } from "@nestjs/typeorm"
import { UserEntity } from "../../database-module/entities/user.entity"
import { Repository } from "typeorm"
import { Injectable } from "@nestjs/common"
import { EditPasswordData } from "../data-contracts/edit-password/edit-password.data"
import { EditPasswordResponse } from "../data-contracts/edit-password/edit-password-response"
import { UserLoginService } from "./user-login.service"
import { HashService } from "../../app-security/services/hash.service"

@Injectable()
export class EditPasswordService {
    constructor(
        @InjectRepository(UserEntity)
        protected readonly userRepository: Repository<UserEntity>,
        protected readonly userLoginService: UserLoginService,
        protected readonly hashService: HashService,
    ) {
    }

    /**
     * @brief try to edit user password
     * @param options options
     * @returns {EditPasswordResponse} edit response
     */

    public async editPassword(options: {
        editPasswordData: EditPasswordData
    }): Promise<EditPasswordResponse> {
        const {
            new_password,
            confirm_new_password,
            old_password,
            authentification_token,
        } = options.editPasswordData
        const payload = this.userLoginService.validateToken(
            authentification_token,
        )
        const user = await this.userRepository.findOneBy({
            email: payload.email,
        })
        const response = new EditPasswordResponse()

        //Verify the user authentication token (JWT)
        if (!payload) {
            response.errorMessage = "error.invalid-token"
            return response
        }
        // User not exist case
        if (!user) {
            response.errorMessage = "error.invalid-token"
            return response
        }

        //Verify if the old password matches the user's current password
        const oldPasswordMatch = await this.hashService.compare({
            toCompare: old_password,
            hash: user.password,
        })

        if (!oldPasswordMatch) {
            response.errorMessage = "error.same-password"
            return response
        }

        // Check if new password and confirm password not match
        if (new_password !== confirm_new_password) {
            response.errorMessage = "error.matching-password"
            return response
        }

        try {
            await this.userRepository.save({
                user: user,
                password: await this.hashService.hash({
                    toHash: new_password,
                    salt: 10,
                }),
            })
        } catch (_) {
            response.errorMessage = "error.technical"
        }

        return response
    }
}
