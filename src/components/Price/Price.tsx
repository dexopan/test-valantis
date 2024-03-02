import { ChangeEvent, useEffect, useState } from 'react'
import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { getProductsFilterPriceApi } from '../../api/product'
import { useAppDispatch } from '../../store/store'
import { setFilteredIds } from '../../store/itemSlice'
import { setPage } from '../../store/pageSlice'
import { useDebounceCallback } from '../../hooks/useDebounceCallback'

const Price = () => {
  const [price, setPrice] = useState('')
  const dispatch = useAppDispatch()
  const delayCallback = useDebounceCallback(1000)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPrice(event.target.value)
  }

  const handleClear = () => {
    setPrice('')
    dispatch(setFilteredIds([]))
    dispatch(setPage(1))
  }

  const loadProductsByPrice = async () => {
    const { result } = await getProductsFilterPriceApi(Number(price))
    dispatch(setFilteredIds(result))
    dispatch(setPage(1))
  }

  useEffect(() => {
    if (price) {
      delayCallback(() => loadProductsByPrice())
    }
  }, [price])

  return (
    <FormControl>
      <InputLabel htmlFor="component-outlined">Цена</InputLabel>
      <OutlinedInput
        endAdornment={price ? <ClearIcon style={{ cursor: 'pointer' }} onClick={handleClear} /> : ''}
        type="number"
        onChange={handleChange}
        id="component-outlined"
        value={price}
        label="Цена"
      />
    </FormControl>
  )
}

export default Price
