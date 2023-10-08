import { configureStore } from '@reduxjs/toolkit'
import { loadingSlice, usersSlice } from './slice'

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    loading: loadingSlice.reducer,
  },
})


export const saveSession = (datas: object) => {store.dispatch(usersSlice.actions.login(datas))}
export const setLoading = (datas: boolean) => {store.dispatch(loadingSlice.actions.loading({loading: datas}))}