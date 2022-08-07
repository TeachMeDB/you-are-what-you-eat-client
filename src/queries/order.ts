import {
    OrderInfo,
    DishInfo,
    OrderIds
    
} from '@/models/order_list';

import {CommitOrderUpload} from '@/models/commit_order';
import {RetOrderId} from '@/models/ret_of_commit';

import {GetApi,PostApi} from "@/utils/requests"


class OrderApi {

    public async getOrderList(order_id:OrderIds){
        let post=await PostApi("OrderDish/GetOrderDishInfo",order_id);
        return (
            post.statusText as string,
            post.data as OrderInfo
        );
    }

    public async postOrderList(orderList:CommitOrderUpload){
        let post=await PostApi("OrderDish/PostOrder",orderList);
        return (
        post.statusText as string,
        post.data as RetOrderId
        );
    }

}

export const orderApi = new OrderApi();



