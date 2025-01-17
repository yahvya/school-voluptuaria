import { IsDateString, IsNumber, IsString } from "class-validator"

/**
 * @brief user place comments datas
 */
export class UserCommentsData{
    @IsString()
    public user_id: string;

    @IsString()
    public place_id: string;

    @IsString()
    public comment: string


    public wroteAt: string
}
