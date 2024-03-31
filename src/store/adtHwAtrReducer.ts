import { createSlice } from "@reduxjs/toolkit"

const defaultAtrHwState = [
    [undefined, undefined, 1, 0, 0, 0],
    [undefined, undefined, 1, 0, 0, 0],
    [undefined, 0, 1, 0, 0, undefined],
    [undefined, 0, 1, 0, 0, undefined]
]

export const hwAtrSlice = createSlice({
    name: 'hwAtr',
    initialState: {
      atrMatrix: defaultAtrHwState
    },
    reducers: {
      setHwAtr: (state, action) => {
        state.atrMatrix = action.payload
      },
      resetHwAtr: (state) => {
        state.atrMatrix = defaultAtrHwState
      }
    },
})

export const { setHwAtr, resetHwAtr } = hwAtrSlice.actions
export default hwAtrSlice.reducer