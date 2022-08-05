import {
    OrderInfo,
    DishInfo
    
} from '@/models/order_list';

import {CommitOrderUpload} from '@/models/commit_order';
import {RetOrderId} from '@/models/ret_of_commit';

import {GetApi,PostApi} from "@/utils/requests"


class OrderApi {

    public async getOrderList(order_id:string){
        return (await (GetApi("OrderDish/GetOrderDishInfo",{
            order_id:order_id
        }))).data as OrderInfo;
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



