import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";


const backendUrl = import.meta.env.VITE_URL;
export const registerUser = createAsyncThunk(
	"auth/registerUser",
	async (
		{
			fullName,
			email,
			password,
			avatar,
			coverImage,
			username,
		},
		{ rejectWithValue }
	) => {
		try {
			avatar = avatar[0];
			coverImage = coverImage[0];
			console.log(
				"in auth actions",
				fullName,
				email,
				password,
				avatar,
				coverImage,
				username
			);

			const config = {
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",

				},
			};
			// console.log("avatar", avatar[0]);

			await axios.post(
				`${backendUrl}/users/register`,
				{
					fullName,
					email,
					password,
					avatar,
					coverImage,
					username,
				},
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
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",

				},
			};

			const { data } = await axios.post(
				`${backendUrl}/users/login`,
				{ email, password },
				config
			);
			localStorage.setItem(
				"refreshToken",
				data.refreshToken
			);
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
