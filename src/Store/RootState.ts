import { combineReducers } from "redux";
import authReducer from "./Reducers/authSlice";
const rootReducer=combineReducers({
    auth:authReducer,
});
export type RootState=ReturnType<typeof rootReducer>