import { configureStore } from '@reduxjs/toolkit'
import { loadingSlice, showhideSlice, usersSlice } from './slice'

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    loading: loadingSlice.reducer,
    showhide: showhideSlice.reducer,
  },
})


export const saveSession = (datas: object) => {store.dispatch(usersSlice.actions.login(datas))}
export const setLoading = (datas: boolean) => {store.dispatch(loadingSlice.actions.loading({loading: datas}))}
export const setShowHide = (datas: boolean) => {store.dispatch(showhideSlice.actions.showhide({showhide: datas}))}