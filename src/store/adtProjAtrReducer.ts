import { createSlice } from "@reduxjs/toolkit"

const defaultAtrProjState = [
    [0, 0, 1, 0, 0, undefined],
    [0, 0, 1, 0, 0, undefined],
    [0, 0, 1, 0, 0, undefined]
]

export const projAtrSlice = createSlice({
    name: 'projAtr',
    initialState: {
      atrMatrix: defaultAtrProjState
    },
    reducers: {
      setProjAtr: (state, action) => {
        state.atrMatrix = action.payload
      },
      resetProjAtr: (state) => {
        state.atrMatrix = defaultAtrProjState
      }
    },
})

export const { setProjAtr, resetProjAtr } = projAtrSlice.actions
export default projAtrSlice.reducer