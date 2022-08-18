import {
    VipInfo,
    UpdateCredit
} from '@/models/vip'

import {GetApi,PostApi} from "@/utils/requests"


class  VipInfoApi {

    public async getVipInfo(user_name:string){
        return (await (GetApi("VIP/GetOneVIPInfo",{
            user_name:user_name
        }))).data as VipInfo;
    }
    public async postVipCredit(user_credit:UpdateCredit){
        return (await PostApi("OrderDish/UpdateCredit",user_credit)).statusText as string;
    }

}

export const vipInfoApi = new VipInfoApi();