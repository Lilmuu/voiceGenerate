import axios from 'axios'

import { getFullURL } from '@/utils/http'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_AXIOS_BASE_URL,
  adapter(config) {
    const { url, method, data, params, headers, baseURL, paramsSerializer } =
      config
    return new Promise((resolve, reject) => {
      uni.request({
        method: method!.toUpperCase() as any,
        url: getFullURL(baseURL || '', url!, params, paramsSerializer),
        header: headers,
        data,
        dataType: 'json',
        responseType: config.responseType,
        timeout: 600000,
        success: (res: any) => {
          resolve(res)
        },
        fail: (err: any) => {
          reject(err)
        }
      })
    })
  }
})

/**
 * 请求拦截
 */
instance.interceptors.request.use((config) => {
  const { method, params } = config
  // 附带鉴权的token
  const headers: any = {
    Authorization: uni.getStorageSync('token')
  }
  // 不缓存get请求
  if (method === 'get') {
    headers['Cache-Control'] = 'no-cache'
  }
  // delete请求参数放入body中
  if (method === 'delete') {
    headers['Content-type'] = 'application/json;'
    Object.assign(config, {
      data: params,
      params: {}
    })
  }

  return {
    ...config,
    headers
  }
})

/**
 * 响应拦截
 */
instance.interceptors.response.use((v) => {
  if (v.data?.code === 401) {
    uni.removeStorageSync('token')
    // alert('即将跳转登录页。。。', '登录过期')
    // setTimeout(redirectHome, 1500)
    return v.data
  }

  // @ts-ignore
  if ((v.status || v.statusCode) === 200) {
    return v.data
  }
  // alert(v.statusText, '网络错误')
  return Promise.reject(v)
})

export default instance
