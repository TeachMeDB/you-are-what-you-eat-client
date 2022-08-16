import {
  AddDish,
  DishesInfo
    
} from '@/models/add_dish';

// import {CommitOrderUpload} from '@/models/commit_order';
// import {RetOrderId} from '@/models/ret_of_commit';

import {GetApi,PostApi} from "@/utils/requests"


class AddDishApi {

    public async postAddDish(addDish:AddDish){
        let post=await PostApi("OrderDish/AddDish",addDish);
        return (
        post.statusText as string
        );
    }

}

export const addDishApi = new AddDishApi();



