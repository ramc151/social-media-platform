import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;

            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', action.payload.token);
        },
        updateUserFollow: (state, action) => {
            const { authorId } = action.payload;

            if (state.user.following.includes(authorId)) {
                state.user.following = state.user.following.filter(id => id !== authorId);
            } else {
                state.user.following.push(authorId);
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;

            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }
})

export const { loginSuccess, logout, updateUserFollow } = authSlice.actions;
export default authSlice.reducer;