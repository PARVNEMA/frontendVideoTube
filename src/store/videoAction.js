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

export const postVideos = createAsyncThunk(
    "postvideo/postVideos",
    async (formData, { rejectWithValue }) => {
        console.log(formData);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };
            const videos = await axios.post(
                `${backendUrl}/videos`,
                { title, description, videoFile, thumbnail },
                config
            );
            if (videos) {
                console.log("Videos has been posted Successfully");
            }
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
