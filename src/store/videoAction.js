import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";

const backendUrl = "/api";
export const fetchVideos = createAsyncThunk(
    "video/fetchVideos",
    async (_, { rejectWithValue }) => {
        try {
            const videos = await axios.get(`${backendUrl}/videos`);
            console.log("videos in videoaction", videos.data);

            return videos.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
