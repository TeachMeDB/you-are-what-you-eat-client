export interface CommitOrderUpload {
    dishes_info: DishesInfo[];
    table_id:number;
    username:string;
}

export interface DishesInfo {
    dish_id:  number;
    dish_num: number;
    dish_price_to_pay:number;
    remark:string;//备注
}