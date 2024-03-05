import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Reducers/authSlice";
 export const store = configureStore({
    reducer:{
        auth:authReducer,
    },
});
