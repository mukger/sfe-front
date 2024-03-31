import { createSlice } from "@reduxjs/toolkit"

const defaultKlocState = ''

export const klocSlice = createSlice({
    name: 'kloc',
    initialState: {
      kloc: defaultKlocState
    },
    reducers: {
      setKloc: (state, action) => {
        state.kloc = action.payload
      },
      resetKloc: (state) => {
        state.kloc = defaultKlocState
      }
    },
})

export const { setKloc, resetKloc } = klocSlice.actions
export default klocSlice.reducer