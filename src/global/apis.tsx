import axios from 'axios';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const url = 'https://api-loker-admin.digylabs.com/api/v1';

export function storeTokenInLocalStorage(token: string) {
  const response = NextResponse.next();
  response.cookies.set({
      name: 'token',
      value: token,
  })
  localStorage.setItem('token', token);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem('token');
}

export const apis = async (datas: any) => { 
  return await axios({
    method: datas.method,
    url: url + datas.url,
    data: datas.data,
    params: datas.data,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getTokenFromLocalStorage()
    }
  })
    .then((response) => {
      return response;
      // dispatch({
      //   type: GET_USER,
      //   payload: {
      //     loading:false,
      //     data: response,
      //     errorMessage: false
      //   }
      // })
    })
    .catch((err) => {
      return err.response;
      // dispatch({
      //   type: GET_USER,
      //   payload: {
      //     loading:false,
      //     data: err,
      //     errorMessage: false
      //   }
      // })
    })
}