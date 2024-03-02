import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getItemsApi, getProductsIdApi } from '../api/product'

type IInitialLikes = {
  ids: string[]
  filteredIds: string[]
  isLoading: boolean
}

const initialState: IInitialLikes = {
  ids: [],
  filteredIds: [],
  isLoading: false,
}

export const getProductsId = createAsyncThunk('getProductsId', async () => {
  const { result } = await getProductsIdApi()
  return result
})

export const getItems = createAsyncThunk('getItemsApi', async (ids: string[]) => {
  const { result } = await getItemsApi(ids)
  return result
})

const itemSlice = createSlice({
  name: 'ids',
  initialState,
  reducers: {
    setAllIds: (state, action: PayloadAction<string[]>) => {
      state.ids.push(...action.payload)
    },
    setFilteredIds: (state, action: PayloadAction<string[]>) => {
      state.filteredIds = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductsId.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(getProductsId.rejected, (state) => {
        state.isLoading = false
      }),
      builder
        .addCase(getItems.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getItems.fulfilled, (state) => {
          state.isLoading = false
        })
        .addCase(getItems.rejected, (state) => {
          state.isLoading = false
        })
  },
})

export const { setAllIds, setFilteredIds } = itemSlice.actions

export default itemSlice.reducer
