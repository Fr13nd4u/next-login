'use client'
import { configureStore } from '@reduxjs/toolkit'

import tableReducer from './slices/table';

const reducer = {
  table: tableReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;