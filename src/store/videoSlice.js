import { createSlice } from "@reduxjs/toolkit";
import { fetchVideos } from "./videoAction";

const initialState = {
    loading: false,
    videoInfo: null, // for user object
    error: null,
    success: false, // for monitoring the registration process.
};

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVideos.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.videoInfo = payload;
            })
            .addCase(fetchVideos.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

// Action creators are generated for each case reducer function

export default videoSlice.reducer;
