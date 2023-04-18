import {
    OrderTotPrice,
    OrderStatus
    
} from '@/models/orderTotPrice'

import {GetApi,PostApi} from "@/utils/requests"


class OrderPriceApi {

    public async getOrderPrice(order_id:string){
        return (await (GetApi("orderPrice",{
            order_id:order_id,
        }))).data as OrderTotPrice;
    }

    public async getOrderStatus(order_id:string){
        return (await (GetApi("orderPayStatus",{
            order_id:order_id,
        }))).data as OrderStatus;
    }
}

export const orderPriceApi = new OrderPriceApi();