import { createSlice } from "@reduxjs/toolkit"

const defaultAlertState = {
  type: '',
  text: '',
  show: false
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState: defaultAlertState,
    reducers: {
      changeAlertShow: (state) => {
        state.show = !state.show
      },
      setAlertText: (state, action) => {
        state.text = action.payload
      },
      setAlertType: (state, action) => {
        state.type = action.payload
      },
      cleanAlert: (state) => {
        state = defaultAlertState
      }
    },
})

export const { changeAlertShow, setAlertText, setAlertType, cleanAlert } = alertSlice.actions
export default alertSlice.reducer