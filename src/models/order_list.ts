export interface OrderInfo {
    dish_info: DishInfo[];
}

export interface DishInfo {
    dish_name: string;
    /**
     * 同dish_id同状态的菜品数量
     */
    dish_num:     number;
    dish_picture: string;
    /**
     * 当前菜品单价
     */
    dish_price: number;
    /**
     * 菜品制作状态
     */
    dish_status: string;
    table_id:    number;
}

export interface OrderIds {
    order_id: string[];
}