import {
    QRcode
} from '@/models/pay_qrcode'

import {GetApi,PostApi} from "@/utils/requests"


class PayApi {

    public async getQRstring(order_id:string,final_price:number){
        return (await (GetApi("Pay/FinalPay",{
            order_id:order_id,
            final_price:final_price
        }))).data as QRcode;
    }
}

export const payApi = new PayApi();