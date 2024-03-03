import { useEffect } from 'react'
import { useAppDispatch } from '../../store/store'
import { getProductsId, setAllIds } from '../../store/itemSlice'
import styles from './Main.module.scss'
import Brands from '../Brands/Brands'
import Price from '../Price/Price'
import SearchProduct from '../SearchProduct/SearchProduct'
import ProductList from '../ProductList/ProductList'

const Main = () => {
  const dispatch = useAppDispatch()

  const loadID = async () => {
    const result = await dispatch(getProductsId()).unwrap()
    const filteredData: string[] = Array.from(new Set(result))
    dispatch(setAllIds(filteredData))
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
