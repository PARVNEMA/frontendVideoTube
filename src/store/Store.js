import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlics";
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
