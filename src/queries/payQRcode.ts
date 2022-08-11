import {
    PayInfo,
    QRcode
} from '@/models/pay_qrcode'

import {GetApi,PostApi} from "@/utils/requests"


class PayApi {

    public async getQRstring(payinfo:PayInfo){
        return (await (GetApi("OrderDish/FinalPay",{
            payinfo:payinfo
        }))).data as QRcode;
    }
}

export const payApi = new PayApi();