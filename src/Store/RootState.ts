import { combineReducers } from "redux";
import productReducer from "./Reducers/productSlice"
import authReducer from "./Reducers/authSlice"
import brandReducer from "./Reducers/brandSlicee"
const rootReducer=combineReducers({
    auth:authReducer,
    product:productReducer,
    brand:brandReducer,
});
export type RootState=ReturnType<typeof rootReducer>