export interface DishRatingUpload {
    /**
     * 评语
     */
    content: string;
    /**
     * 菜品ID
     */
    dish_id: number;
    /**
     * 评分
     */
    rate:     number;
    username: string;
}

export interface ServiceRatingUpload {
    content:  string;
    rate:     number;
    username: string;
}