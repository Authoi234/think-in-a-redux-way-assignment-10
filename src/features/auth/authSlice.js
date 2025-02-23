import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {
        accessToken: undefined,
        user: undefined,
    };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut: (state) => {
            state.accessToken = undefined;
            state.user = undefined;
            localStorage.removeItem("auth");
        },
    },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;