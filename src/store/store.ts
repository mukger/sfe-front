import { combineReducers, configureStore } from '@reduxjs/toolkit'
import atrProdReducer from './adtProdAtrReducer'
import atrHwReducer from './adtHwAtrReducer'
import atrPersReducer from './adtPersAtrReducer'
import atrProjReducer from './adtProjAtrReducer'
import projectModeReducer from './projectModeReducer'
import klocReducer from './klocReducer'
import controlReducer from './controlReducer'
import alertReducer from './alertReducer'

const rootReducer = combineReducers({
  prodAtr: atrProdReducer,
  hwAtr: atrHwReducer,
  persAtr: atrPersReducer,
  projAtr: atrProjReducer,
  projectMode: projectModeReducer,
  kloc: klocReducer,
  control: controlReducer,
  alert: alertReducer
});

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store;
