export interface VipInfo {
    balance:   number | null;
    credit:    number | null;
    gender:    null | string;
    user_name: string;
}

export interface UpdateCredit {
    /**
     * 扣除后的积分
     */
    credit:    number;
    user_name: string;
}