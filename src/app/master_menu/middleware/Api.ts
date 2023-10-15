import { apis } from "@/global/apis";

export const getMerchant = async (token: string, page: number, perPage: number, search: string) => {
    const data = {
      method: 'get',
      url: '/master/merchant/results',
      token: token,
      data: {
        page: page,
        perpage: perPage,
        name: search,
      }
    }
    const result = await apis(data)
    return result;
  }
    
  export const getMerchantById = async (token: string, merchant_id: string) => {
    const data = {
      method: 'get',
      url: '/master/merchant/result/'+merchant_id,
      token: token,
      data: {
      }
    }
    const result = await apis(data)
    return result;
  }

  export const createMasterMenu = async (token: string, data: object) => {
    const datas = {
      method: 'post',
      url: '/master/menu/create',
      token: token,
      data: data,
    }
    const result = await apis(datas)
    return result
  }