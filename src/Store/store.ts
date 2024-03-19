import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Reducers/authSlice";
import productReducer from "./Reducers/productSlice";
import brandReducer from "./Reducers/brandSlicee";
 export const store = configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
        brand:brandReducer,
    },
});
