export interface AddDish {
    dishes_info: DishesInfo[];
    /**
     * 订单号
     */
    order_id: string;
    table_id: number;
}

export interface DishesInfo {
    dish_id:           number;
    dish_num:          number;
    dish_price_to_pay: number;
    remark:            string;
}