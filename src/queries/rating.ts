import {
    DishRatingUpload,
    ServiceRatingUpload
    
} from '@/models/rating';


import {GetApi,PostApi} from "@/utils/requests"


class RatingApi {

    public async postDishRating(dishRating:DishRatingUpload){
        let post=await PostApi("dishrate",dishRating);
        return post.statusText as string;
    }

    public async postServiceRating(serviceRating:ServiceRatingUpload){
        let post=await PostApi("servicerate",serviceRating);
        return post.statusText as string;
    }

}

export const ratingApi = new RatingApi();



