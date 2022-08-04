import {
    OrderInfo,
    DishInfo
    
} from '@/models/order_list'

import {GetApi,PostApi} from "@/utils/requests"


class OrderApi {

    public async getOrderList(order_id:string){
        return (await (GetApi("OrderDish/GetOrderDishInfo",{
            order_id:order_id
        }))).data as OrderInfo;
    }


}

export const orderApi = new OrderApi();