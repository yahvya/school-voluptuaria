import {IsBoolean, IsNotEmpty, IsNumber, IsObject} from "class-validator";

export class ProposalDatas {
    @IsNumber()
    @IsNotEmpty()
    public order : number

    @IsObject()
    @IsNotEmpty()
    public place : object

    @IsBoolean()
    @IsNotEmpty()
    public isCompleted : boolean
}
