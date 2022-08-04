import {
    Promotions,
    DishElement,
    DishDish
    
} from '@/models/promtions'

import {GetApi,PostApi} from "@/utils/requests"


class PromoApi {

    public async getPromos(){
        return (await (GetApi("OrderDish/GetPromotion",{
     
        }))).data as Promotions[];
    }
}

export const promoApi = new PromoApi();