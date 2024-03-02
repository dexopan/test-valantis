/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { getCurrentDate } from '../utils/utils'

const date = getCurrentDate()

const token = CryptoJS.MD5(`${import.meta.env.VITE_API_PASSWORD}_${date}`).toString()

export const $authHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const authInterceptor = (config: any) => {
  config.headers['X-Auth'] = `${token}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)
