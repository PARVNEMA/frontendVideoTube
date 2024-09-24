import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";

const backendUrl = "/api";
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ fullName, email, password, avatar }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };
            console.log("avatar", avatar[0]);

            await axios.post(
                `${backendUrl}/users/register`,
                { fullName, email, password, avatar },
                config
            );
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
export const LoginUser = createAsyncThunk(
    "auth/registerUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                `${backendUrl}/users/login`,
                { email, password },
                config
            );
            localStorage.setItem("refreshToken", data.refreshToken);
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
