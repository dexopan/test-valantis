import styles from './ProductItem.module.scss'
import { IItem } from '../../models'

const ProductItem = ({ item }: { item: IItem }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{item.product}</h3>
      <div className={styles.id}>{item.id}</div>
      <div className={styles.wrapper}>
        <div className={styles.brand}>{item.brand}</div>
        <div className={styles.price}>{item.price} ₽</div>
      </div>
    </div>
  )
}

export default ProductItem
