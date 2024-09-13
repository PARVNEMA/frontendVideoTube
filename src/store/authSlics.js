import { createSlice } from "@reduxjs/toolkit";

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
});

// Action creators are generated for each case reducer function

export default authSlice.reducer;
