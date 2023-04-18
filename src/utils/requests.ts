/*
import axios from 'axios'

import {backendURL} from "./config"


export async function GetApi(url:string,params?:{}){

    return axios.get(url,{
        baseURL:backendURL,
        params:params,
    })
}


export async function PostApi(url:string,body:{}){
    return axios.post(url,body,{
        baseURL:backendURL
    });
}
*/

import axios from 'axios';

import GlobalConfig from './config';

export const GetApi = async (url: string, params?: {}) => {
  return axios.get(url, {
    baseURL: GlobalConfig.getBackendURL(),
    params: {
      ...params,
      token: GlobalConfig.getAccessToken()
    }
  });
};

export const PostApi = async (url: string, body: {}) => {
  return axios.post(
    url,
    {
      ...body,
      token: GlobalConfig.getAccessToken()
    },
    {
      baseURL: GlobalConfig.getBackendURL()
    }
  );
};

export async function DeleteApi(url: string, params?: {}) {
  return axios.delete(url, {
    baseURL: GlobalConfig.getBackendURL(),
    params: {
      ...params,
      token: GlobalConfig.getAccessToken()
    }
  });
}

export const PutApi = async (url: string, body: {}) => {
  return axios.put(
    url,
    {
      ...body,
      token: GlobalConfig.getAccessToken()
    },
    {
      baseURL: GlobalConfig.getBackendURL()
    }
  )
}

export const PatchApi = async (url: string, body: {}) => {
  return axios.patch(
    url,
    {
      ...body,
      token: GlobalConfig.getAccessToken()
    },
    {
      baseURL: GlobalConfig.getBackendURL()
    }
  )
}
