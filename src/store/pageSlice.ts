import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type IInitialLikes = {
  page: number
}

const initialState: IInitialLikes = {
  page: 1,
}

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
  },
})

export const { setPage } = pageSlice.actions

export default pageSlice.reducer
