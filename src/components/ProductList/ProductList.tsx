import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setPage } from '../../store/pageSlice'
import { getItems } from '../../store/itemSlice'
import ProductItem from '../ProductItem/ProductItem'
import Loading from '../Loading/Loading'
import { getUniqueItems } from '../../utils/utils'
import { IItem } from '../../models'
import styles from './ProductList.module.scss'

const ProductList = () => {
  const currentPage = useAppSelector((state) => state.page.page)
  const allIds = useAppSelector((state) => state.product.ids)
  const filteredIds = useAppSelector((state) => state.product.filteredIds)
  const isLoading = useAppSelector((state) => state.product.isLoading)
  const [allItems, setAllItems] = useState<IItem[]>([])
  const [filteredItems, setFilteredItems] = useState<IItem[]>([])
  const dispatch = useAppDispatch()
  const itemsPerPage = 50
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredIds.length
    ? filteredItems.slice(indexOfFirstItem, indexOfLastItem)
    : allItems.slice(indexOfFirstItem, indexOfLastItem)

  const loadAllItems = async () => {
    const result = await dispatch(getItems(allIds)).unwrap()
    const filteredData = getUniqueItems(result)
    setAllItems(filteredData)
  }

  const loadFilteredlItems = async () => {
    const result = await dispatch(getItems(filteredIds)).unwrap()
    const filteredData = getUniqueItems(result)
    setFilteredItems(filteredData)
  }

  const prevPage = () => {
    dispatch(setPage(currentPage - 1))
  }

  const nextPage = () => {
    dispatch(setPage(currentPage + 1))
  }

  useEffect(() => {
    if (allIds.length) {
      loadAllItems()
    }
  }, [allIds])

  useEffect(() => {
    if (filteredIds.length) {
      loadFilteredlItems()
    }
  }, [filteredIds])

  const isDisabledNextButton = () => {
    if (filteredIds.length) {
      if (currentPage * itemsPerPage < filteredIds.length) {
        return false
      } else {
        return true
      }
    }
    if (currentPage * itemsPerPage < allIds.length) {
      return false
    } else {
      return true
    }
  }

  return (
    <div>
      {isLoading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : (
        <>
          <div className={styles.list}>
            {currentItems.map((item) => (
              <ProductItem key={item.id} item={item} />
            ))}
          </div>
          <div className={styles.pagination}>
            <button disabled={currentPage === 1} onClick={prevPage} className={styles.pagination_button}>
              <img src="/arrowLeft.png" alt="icon arrowLeft" />
            </button>
            <div className={styles.pagination_number}>{currentPage}</div>
            <button disabled={isDisabledNextButton()} onClick={nextPage} className={styles.pagination_button}>
              <img src="/arrowRight.png" alt="icon arrowRight" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductList
