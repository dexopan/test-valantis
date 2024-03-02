import { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { getProductsBrandApi, getProductsFilterBrandApi } from '../../api/product'
import { setFilteredIds } from '../../store/itemSlice'
import { useAppDispatch } from '../../store/store'
import { setPage } from '../../store/pageSlice'

const Brands = () => {
  const [allBrands, setAllBrands] = useState<string[]>([])
  const dispatch = useAppDispatch()

  const [brand, setBrand] = useState('')

  const loadBrands = async () => {
    const { result } = await getProductsBrandApi()
    const filteredBrands: string[] = Array.from(new Set(result))
    setAllBrands(filteredBrands)
  }

  const handleChange = (event: SelectChangeEvent) => {
    setBrand(event.target.value)
  }

  const handleClear = () => {
    setBrand('')
    dispatch(setFilteredIds([]))
    dispatch(setPage(1))
  }

  const loadProductsByBrand = async () => {
    const { result } = await getProductsFilterBrandApi(brand)
    dispatch(setFilteredIds(result))
    dispatch(setPage(1))
  }

  useEffect(() => {
    loadBrands()
  }, [])

  useEffect(() => {
    if (brand) {
      loadProductsByBrand()
    }
  }, [brand])

  return (
    <Box sx={{ width: 270 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Бренд</InputLabel>
        <Select
          endAdornment={
            brand ? (
              <ClearIcon style={{ cursor: 'pointer', position: 'absolute', right: '25px' }} onClick={handleClear} />
            ) : (
              ''
            )
          }
          labelId="simple-select-label"
          id="demo-simple-select"
          label="Бренд"
          value={brand}
          onChange={handleChange}
          MenuProps={{ MenuListProps: { sx: { height: '300px' }, disablePadding: true } }}
        >
          {allBrands.map((brand) => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default Brands
