import { createSlice } from "@reduxjs/toolkit";
import { LoginUser, registerUser } from "./authActions";

const initialState = {
    loading: false,
    userInfo: null, // for user object
    userToken: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
};


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.userInfo = payload;
                // state.refreshToken = payload.refreshToken;
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

// Action creators are generated for each case reducer function

export default authSlice.reducer;
