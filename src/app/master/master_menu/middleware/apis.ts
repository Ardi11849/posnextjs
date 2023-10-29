import { apis } from "@/global/config/apis";

export const getMasterMenu = async (token: string, page: number, perPage: number, search: string) => {
    const data = {
        method: 'get',
        url: '/master/menu/results',
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

interface getMenuRelation {
    token: string,
    merchant_id: string,
    id: string | null,
    search: string | null,
    sort: string | null
}
export const getMasterMenuRelation = async ({token, merchant_id, id, search, sort}: getMenuRelation) => {
    const data = {
        method: 'get',
        url: '/master/menu/results-relation',
        token: token,
        data: {
            merchant_id: merchant_id,
            id: id,
            name: search,
            sort: sort
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