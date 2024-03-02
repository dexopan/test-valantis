import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getProductsId, setAllIds } from '../../store/itemSlice'
import styles from './Main.module.scss'
import Brands from '../Brands/Brands'
import Price from '../Price/Price'
import SearchProduct from '../SearchProduct/SearchProduct'
import ProductList from '../ProductList/ProductList'

const Main = () => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector((state) => state.page.page)
  const loadID = async () => {
    console.log(currentPage)
    const result = await dispatch(getProductsId()).unwrap()
    const filteredData: string[] = Array.from(new Set(result))
    dispatch(setAllIds(filteredData))
    console.log(filteredData.length)
  }

  useEffect(() => {
    loadID()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h3 className={styles.sidebar_title}>Фильтры</h3>
        <div className={styles.filters}>
          <SearchProduct />
          <Price />
          <Brands />
        </div>
      </div>
      <div className={styles.wrapper_main}>
        <h2 className={styles.title}>Каталог ювелирных изделий</h2>
        <ProductList />
      </div>
    </div>
  )
}

export default Main
