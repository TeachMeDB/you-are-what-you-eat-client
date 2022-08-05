import {
    OrderTotPrice
    
} from '@/models/orderTotPrice'

import {GetApi,PostApi} from "@/utils/requests"


class OrderPriceApi {

    public async getOrderPrice(order_id:string){
        return (await (GetApi("OrderDish/GetOrderPrice",{
            order_id:order_id,
        }))).data as OrderTotPrice;
    }
}

export const orderPriceApi = new OrderPriceApi();