import { IsNotEmpty, IsString } from "class-validator"

export class CategoryEntityData {
    @IsNotEmpty()
    @IsString()
    public id : string;

    @IsNotEmpty()
    @IsString()
    public name : string;
}
