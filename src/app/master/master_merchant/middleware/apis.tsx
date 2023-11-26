import { apis } from "@/global/config/apis";

interface getInterface {
    sort: string | null,
    page: number | null,
    perPage: number | null,
    search: string | null,
    id: number | null
}

export const getMerchant = async ({ sort, page, perPage, search, id }: getInterface) => {
    const data = {
        method: 'get',
        url: '/master/merchant/results',
        data: {
            sort: sort,
            page: page,
            perpage: perPage,
            name: search,
            id: id
        }
    }
    const result = await apis(data)
    return result;
}

interface getMerchantByIdInterface {
    merchantId: string
}
export const getMerchantById = async ({ merchantId }: getMerchantByIdInterface) => {
    const data = {
        method: 'get',
        url: '/master/merchant/result',
        data: {
            merchant_id: merchantId
        }
    }
    const result = await apis(data)
    return result;
}