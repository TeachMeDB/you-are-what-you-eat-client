import {
    DishesInfo,
    DishHavethetag,
    DishAll,
    DishesAll
    
} from '@/models/dishes_info'

import {GetApi,PostApi} from "@/utils/requests"


class DishesApi {

    public async getCategoryDishes(dish_tag:string,promotion_id:number){
        return (await (GetApi("dishesByCategory",{
            dish_tag:dish_tag,
            promotion_id:promotion_id
        }))).data as DishHavethetag[];
    }
    public async getAllDishes(){
        return (await (GetApi("dishesForPromotions",{
        }))).data as DishAll[];
    }

}

export const dishesApi = new DishesApi();