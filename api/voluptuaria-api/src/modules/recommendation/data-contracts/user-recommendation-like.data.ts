import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

export class UserRecommendationLikeData {
    @IsNotEmpty()
    @IsString()
    public socialProfile_id: string;

    @IsNotEmpty()
    @IsString()
    public category_name : string;

    @IsNotEmpty()
    @IsBoolean()
    public like : boolean;
}
