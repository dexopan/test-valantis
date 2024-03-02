import { IItem } from '../models'

export const getCurrentDate = () => {
  const currentDate = new Date()
  const year = currentDate.getUTCFullYear()
  const month = currentDate.getUTCMonth() + 1 > 9 ? currentDate.getUTCMonth() + 1 : `0${currentDate.getUTCMonth() + 1}`
  const day = currentDate.getUTCDate() + 1 > 9 ? currentDate.getUTCDate() : `0${currentDate.getUTCDate()}`
  return `${year}${month}${day}`
}

export const getUniqueItems = (array: IItem[]) => {
  return Array.from(new Set(array.map((item) => item.id))).map((id) => array.find((item) => item.id === id)) as IItem[]
}
