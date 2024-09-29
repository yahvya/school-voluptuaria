import {ImagesDatas} from "./images.datas";
import {CoordinatesDatas} from "./coordinates.datas";
import {PriceDatas} from "./price.datas";
import {CategoriesDatas} from "./categories.datas";
import {AccessibilityDatas} from "./accessibility.datas";
import {OpeningHourDatas} from "./opening-hour.datas";
import {CommentsDatas} from "./comments.datas";

/**
 * @brief place datas
 */
export class PlaceDatas {
    public accessId: string | null;

    public prices: PriceDatas;

    public placeName: string;

    public phoneNumber:string

    public isOpenedNow: boolean;

    public openOnGoogleMapsUri:string

    public forKids:boolean|null

    public rating:number

    public images: ImagesDatas[];

    public coordinate: CoordinatesDatas

    public categories: CategoriesDatas[]

    public comments:CommentsDatas[]

    public accessibility:AccessibilityDatas|null

    /**
     * @brief record indexed by the date pointing to a boolean defining if it's open
     */
    public openingHours:OpeningHourDatas[]
}
