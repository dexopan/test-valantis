import { ChangeEvent, useEffect, useState } from 'react'
import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { getProductsFilterNameApi } from '../../api/product'
import { useAppDispatch } from '../../store/store'
import { setFilteredIds } from '../../store/itemSlice'
import { useDebounceCallback } from '../../hooks/useDebounceCallback'
import { setPage } from '../../store/pageSlice'

const SearchProduct = () => {
  const [name, setName] = useState('')
  const dispatch = useAppDispatch()
  const delayCallback = useDebounceCallback(1000)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(event.target.value)
  }

  const handleClear = () => {
    setName('')
    dispatch(setFilteredIds([]))
    dispatch(setPage(1))
  }

  const loadProductsByName = async () => {
    const { result } = await getProductsFilterNameApi(name)
    dispatch(setFilteredIds(result))
    dispatch(setPage(1))
  }

  useEffect(() => {
    if (name) {
      delayCallback(() => loadProductsByName())
    }
  }, [name])

  return (
    <FormControl>
      <InputLabel htmlFor="component-outlined">Название</InputLabel>
      <OutlinedInput
        endAdornment={name ? <ClearIcon style={{ cursor: 'pointer' }} onClick={handleClear} /> : ''}
        onChange={handleChange}
        id="component-outlined"
        value={name}
        label="Название"
      />
    </FormControl>
  )
}

export default SearchProduct
