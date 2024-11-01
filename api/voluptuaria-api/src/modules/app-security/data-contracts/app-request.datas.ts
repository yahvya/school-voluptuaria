import { IsNotEmpty, IsString } from "class-validator"

/**
 * @brief data contracts for app request
 */
export class AppRequest {
    @IsString()
    @IsNotEmpty()
    public apiToken: string

    @IsString()
    @IsNotEmpty()
    public iv: string
}