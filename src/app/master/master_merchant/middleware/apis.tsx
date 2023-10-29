import { apis } from "@/global/config/apis";

interface getInterface {
    token: string | null | undefined,
    sort: string | null,
    page: number | null,
    perPage: number | null,
    search: string | null,
    id: number | null
}

export const getMerchant = async ({ token, sort, page, perPage, search, id }: getInterface) => {
    const data = {
        method: 'get',
        url: '/master/merchant/results',
        token: token,
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
    token: string | null | undefined,
    merchant_id: string
}
export const getMerchantById = async ({ token, merchant_id }: getMerchantByIdInterface) => {
    const data = {
        method: 'get',
        url: '/master/merchant/result',
        data: {
            token: token,
            merchant_id: merchant_id
        }
    }
    const result = await apis(data)
    return result;
}