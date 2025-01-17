import { IsNotEmpty, IsString } from "class-validator"

export class UserRecommendationLikeResponseData {
    @IsNotEmpty()
    @IsString()
    public message: string | null ;  // can be null in case of success
}
