import { createSlice } from "@reduxjs/toolkit";

/**User Slice */
// Define a type for the slice state
interface usersState {
    token: string
    expired: string
    username: string
    email: string
}

// Define the initial state using that type
const initialUserState: usersState = {
    token: "",
    expired: "",
    username: "",
    email: ""
}

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialUserState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.expired = action.payload.expired;
            state.username = action.payload.username;
            state.email = action.payload.email;
        }
    }
})

/** Loading Slice */
// Define a type for the slice state
interface loadingState {
    isLoading: boolean
}

// Define the initial state using that type
const initialLoadingState: loadingState = {
    isLoading: false
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: initialLoadingState,
    reducers: {
        loading(state, action) {
            state.isLoading = action.payload.loading;
        }
    }
})
