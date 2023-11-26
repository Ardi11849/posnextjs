import { apis } from "@/global/config/apis";


interface getMenu {
    merchant_id: string,
    id: string | null | undefined,
    search: string | null,
    page: string | null,
    perPage: string | null,
    sort: string | null
}
export const getMasterMenu = async ({merchant_id, id, search, page, perPage, sort}: getMenu) => {
    const data = {
        method: 'get',
        url: '/master/menu/results',
        data: {
            merchant_id: merchant_id,
            id: id,
            sort: sort,
            page: page,
            perpage: perPage,
            name: search,
        }
    }
    const result = await apis(data)
    return result;
}

interface getMenuRelation {
    merchant_id: string,
    id: string | null,
    search: string | null,
    sort: string | null
}
export const getMasterMenuRelation = async ({merchant_id, id, search, sort}: getMenuRelation) => {
    const data = {
        method: 'get',
        url: '/master/menu/results-relation',
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

export const createMasterMenu = async (data: object) => {
    const datas = {
        method: 'post',
        url: '/master/menu/create',
        data: data,
    }
    const result = await apis(datas)
    return result
}

export const updateMasterMenu = async (data: object) => {
    const datas = {
        method: 'put',
        url: '/master/menu/update',
        data: data,
    }
    const result = await apis(datas)
    return result
}

export const deleteMasterMenu = async (data: object) => {
    const datas = {
        method: 'delete',
        url: '/master/menu/delete',
        data: data,
    }
    const result = await apis(datas)
    return result
}

export const getMasterMenuDetail = async (data: object) => {
    const datas = {
        method: 'get',
        url: '/master/menu-detail/results',
        data: data
    }
    const result = await apis(datas)
    return result
}

export const createMasterMenuDetail = async (data: object) => {
    const datas = {
        method: 'post',
        url: '/master/menu-detail/create',
        data: data,
        type: 'array'
    }
    const result = await apis(datas)
    return result
}

export const updateMasterMenuDetail = async (data: object) => {
    const datas = {
        method: 'put',
        url: '/master/menu-detail/update',
        data: data,
        type: 'json'
    }
    const result = await apis(datas)
    return result
}

export const deleteMasterMenuDetail = async (data: object) => {
    const datas = {
        method: 'delete',
        url: '/master/menu-detail/delete',
        data: data,
        type: 'json'
    }
    const result = await apis(datas)
    return result
}