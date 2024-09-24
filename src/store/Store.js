import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlics";
import vidReducer from "./videoSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        video: vidReducer,
    },
});

export default store;
