import { apis } from "@/global/config/apis";

interface getInterface {
    token: string,
    sort: string | null,
    page: number | null,
    perPage: number | null,
    search: string | null,
    id: number | null
}
export const getMasterMerchant = async ({ token, sort, page, perPage, search, id }: getInterface) => {
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