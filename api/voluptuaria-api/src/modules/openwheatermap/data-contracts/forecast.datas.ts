import {TemperatureDatas} from "./temperature.datas";
import {PressureDatas} from "./pressure.datas";

/**
 * @brief weather provided datas
 */
export class ForecastDatas {
    public date : string;

    public temperature : TemperatureDatas

    public name : string;

    public sunrise : string;

    public pressure : PressureDatas|null;

    public placeDescription:string

    public alert : string | null;
}
