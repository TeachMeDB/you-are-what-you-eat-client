import { CryptoVip, CryptoAllVip , CryptoCreateVip, VipInfo } from '@/models/crypto_vip';

import { GetApi, PostApi, PutApi } from '@/utils/requests';

class QueryVipApi {
  public getVip: () => Promise<CryptoAllVip> = async () => {
    try {
      const rawData = (await GetApi('vips/all')).data;
      rawData.summary.options = {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10
          }
        },
        xaxis: {
          type: 'text',
          categories: rawData.summary.options.xaxis.categories
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      };

      rawData.summary2.options = {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10
          }
        },
        xaxis: {
          type: 'text',
          categories: rawData.summary2.options.xaxis.categories
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      };

      return rawData;
    } catch (err) {
      console.log(err);
      return null;
    }

    //  return Promise.resolve(data);
  };

  public editVip: (vip: CryptoVip) => Promise<string> = async (vip) => {
    const r = await PutApi('vips', vip);
    return r.statusText;
  };

  public createVip: (vip: CryptoCreateVip) => Promise<string> = async (vip) => {
    //api还没有准备好
    const tempVip:tempCreateVip={
      phone_number:vip.user_name,
      birthday:vip.birthday,
      gender:vip.gender
    }
    const r = await PostApi('vips', tempVip);
    return r.statusText;
  };

  public async getOneVIPInfo(user_name:string){
    return (await (GetApi("vips",{
      user_name:user_name
    }))).data as VipInfo;
  }
}

export const queryVipApi = new QueryVipApi();

//因为Api里面字段名称不一样所以暂时先用这个中转一下
interface tempCreateVip
{
      phone_number:string;
      birthday:string;
      gender:string;
}
