import { createSlice } from "@reduxjs/toolkit"

const defaultAtrPersState = [
    [0, 0, 1, 0, 0, undefined], 
    [0, 0, 1, 0, 0, undefined],
    [0, 0, 1, 0, 0, undefined], 
    [0, 0, 1, 0, undefined, undefined], 
    [0, 0, 1, 0, undefined, undefined]
]

export const persAtrSlice = createSlice({
    name: 'persAtr',
    initialState: {
      atrMatrix: defaultAtrPersState
    },
    reducers: {
      setPersAtr: (state, action) => {
        state.atrMatrix = action.payload
      },
      resetPersAtr: (state) => {
        state.atrMatrix = defaultAtrPersState
      }
    },
})

export const { setPersAtr, resetPersAtr } = persAtrSlice.actions
export default persAtrSlice.reducer