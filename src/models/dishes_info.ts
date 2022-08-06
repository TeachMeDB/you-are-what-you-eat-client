export interface DishesInfo {
    dish_havethetag: DishHavethetag[];
}

export interface DishHavethetag {
    dish_description: string;
    dish_discount:    number;
    dish_id:          number;
    dish_name:        string;
    dish_picture:     string;
    dish_price:       number;
    dish_rate:        number;
}

export interface DishesAll {
    dish_all: DishAll[];
}

export interface DishAll {
    dish_description: string;
    dish_discount:    number;
    dish_id:          number;
    dish_name:        string;
    dish_picture:     string;
    dish_price:       number;
    dish_rate:        number;
    dish_tag:         string;
}