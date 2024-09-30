/**
 * @brief data contracts for app request
 */
import {IsNotEmpty, IsString} from "class-validator";

export class AppRequest {
    @IsString()
    @IsNotEmpty()
    public apiToken: string;

    @IsString()
    @IsNotEmpty()
    public iv: string;
}
