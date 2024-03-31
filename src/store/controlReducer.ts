import { createSlice } from "@reduxjs/toolkit"

const defaultControlState = {
  result: false,
  inputWarning: false
}

export const controlSlice = createSlice({
    name: 'control',
    initialState: {
      control: defaultControlState
    },
    reducers: {
      setResultControl: (state, action) => {
        state.control.result = action.payload
      },
      setInputWarningControl: (state, action) => {
        state.control.inputWarning = action.payload
      }
    },
})

export const { setResultControl, setInputWarningControl } = controlSlice.actions
export default controlSlice.reducer