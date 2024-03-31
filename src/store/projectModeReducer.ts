import { createSlice } from "@reduxjs/toolkit"
import { ProjectModesList } from "../constants/projectModes"

const defaultProjectModeState = ProjectModesList.ORGANIC

export const projectModeSlice = createSlice({
    name: 'projectMode',
    initialState: {
      projectMode: defaultProjectModeState
    },
    reducers: {
      setProjectMode: (state, action) => {
        state.projectMode = action.payload
      },
      resetProjectMode: (state) => {
        state.projectMode = defaultProjectModeState
      }
    },
})

export const { setProjectMode, resetProjectMode } = projectModeSlice.actions
export default projectModeSlice.reducer