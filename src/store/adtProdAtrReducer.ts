import { createSlice } from "@reduxjs/toolkit"

const defaultAtrProdState = [
    [0, 0, 1, 0, 0, undefined],
    [undefined, 0, 1, 0, 0, undefined], 
    [0, 0, 1, 0, 0, 0]
]

export const prodAtrSlice = createSlice({
    name: 'prodAtr',
    initialState: {
      atrMatrix: defaultAtrProdState
    },
    reducers: {
      setProdAtr: (state, action) => {
        state.atrMatrix = action.payload
      },
      resetProdAtr: (state) => {
        state.atrMatrix = defaultAtrProdState
      }
    },
})

export const { setProdAtr, resetProdAtr } = prodAtrSlice.actions
export default prodAtrSlice.reducer