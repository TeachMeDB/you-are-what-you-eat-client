import {
    QRcode
} from '@/models/pay_qrcode'

import {GetApi,PostApi} from "@/utils/requests"


class PayApi {

    public async getQRstring(final_price:number){
        return (await (GetApi("OrderDish/FinalPay",{
            final_price:final_price
        }))).data as QRcode;
    }
}

export const payApi = new PayApi();