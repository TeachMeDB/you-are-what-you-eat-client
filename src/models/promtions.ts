export interface Promotions {
    map(arg0: (promo: any, index: any) => JSX.Element): import("react").ReactNode;
    description: string;
    picture: string;
    dishes:      DishElement[];
    /**
     * 活动id
     */
    promotion_id: number;
}

export interface DishElement {
    /**
     * 范围0-1
     */
    discount: number;
    dish:     DishDish;
}

export interface DishDish {
    dish_description: string;
    dish_id:          number;
    dish_name:        string;
    dish_picture:     string;
    /**
     * 原价
     */
    dish_price: number;
}

export interface PromoPrice {
    /**
     * 活动折扣，0-1
     */
    discount: number;
    /**
     * 原价
     */
    price: number;
}