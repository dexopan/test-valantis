/* eslint-disable @typescript-eslint/no-explicit-any */
import { $authHost } from './axiosClient'
import { IItem, IParam } from '../models'

export const getProductsIdApi = async (retries = 5): Promise<{ result: string[] }> => {
  try {
    const action = 'get_ids'
    const params: IParam = {
      // Думал сначала сделать с лимитом, но из-за возможных ошибок API, и проверок на дубли id
      // оптимально будет в данной задаче дождаться полной загрузки всех товаров.
      // limit: 100,
      // offset: 50 * (page - 1),
    }
    const { data } = await $authHost.post('', { action, params })
    return data
  } catch (error: any) {
    if (retries > 0) {
      console.error('Error id: ', error.response.data)
      return getProductsIdApi(retries - 1)
    } else {
      throw new Error('Max retries exceeded, could not fetch data')
    }
  }
}

export const getItemsApi = async (ids: string[], retries = 5): Promise<{ result: IItem[] }> => {
  try {
    const action = 'get_items'
    const params: IParam = {
      ids,
    }
    const { data } = await $authHost.post('', { action, params })
    return data
  } catch (error: any) {
    if (retries > 0) {
      console.error('Error id: ', error.response.data)
      return getItemsApi(ids, retries - 1)
    } else {
      throw new Error('Max retries exceeded, could not fetch data')
    }
  }
}

export const getProductsBrandApi = async (): Promise<{ result: string[] }> => {
  try {
    const action = 'get_fields'
    const params: IParam = {
      field: 'brand',
    }
    const { data } = await $authHost.post('', { action, params })
    return data
  } catch (error: any) {
    console.error('Error id: ', error.response.data)
    return getProductsBrandApi()
  }
}

export const getProductsFilterPriceApi = async (price: number): Promise<{ result: string[] }> => {
  try {
    const action = 'filter'
    const params: IParam = {
      price,
    }
    const { data } = await $authHost.post('', { action, params })
    return data
  } catch (error: any) {
    console.error('Error id: ', error.response.data)
    return getProductsFilterPriceApi(price)
  }
}

export const getProductsFilterNameApi = async (product: string): Promise<{ result: string[] }> => {
  try {
    const action = 'filter'
    const params: IParam = {
      product,
    }
    const { data } = await $authHost.post('', { action, params })
    return data
  } catch (error: any) {
    console.error('Error id: ', error.response.data)
    return getProductsFilterNameApi(product)
  }
}

export const getProductsFilterBrandApi = async (brand: string): Promise<{ result: string[] }> => {
  try {
    const action = 'filter'
    const params: IParam = {
      brand,
    }
    const { data } = await $authHost.post('', { action, params })
    return data
  } catch (error: any) {
    console.error('Error id: ', error.response.data)
    return getProductsFilterBrandApi(brand)
  }
}
