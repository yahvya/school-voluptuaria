import { IsString } from "class-validator"

/**
 * @brief response of user comment on the recommendation
 */
export class UserCommentsResponseDatas{
    @IsString()
    public message: string | null ;
}
