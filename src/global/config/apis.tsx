import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;

export const apis = async (datas: any) => {
    return await axios({
        method: datas.method,
        url: url + datas.url,
        data: datas.data,
        params: datas.data,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + datas.token
        }
    }).then((response) => {
        return response;
    }).catch((err) => {
        return err;
    })
}