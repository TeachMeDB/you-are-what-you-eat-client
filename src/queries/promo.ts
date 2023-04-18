import {
    Promotions,
    DishElement,
    DishDish,
    PromoPrice
    
} from '@/models/promtions'

import {GetApi,PostApi} from "@/utils/requests"


class PromoApi {

    public async getPromos(){
        return (await (GetApi("runningPromotion",{
     
        }))).data as Promotions[];
    }

    public async getPromoPrice(promo_id:number,dish_id:number){
        return (await (GetApi("dishRealPrice",{
            promotion_id:promo_id,
            dish_id:dish_id
        }))).data as PromoPrice;
    }

}

export const promoApi = new PromoApi();