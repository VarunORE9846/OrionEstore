import {
  combineReducers,
  configureStore,
//   getDefaultMiddleware,
} from "@reduxjs/toolkit";
import authReducer from "./Reducers/authSlice";
import productReducer from "./Reducers/productSlice";
import brandReducer from "./Reducers/brandSlicee";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
//   blacklist: ["register"],
};
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    product: productReducer,
    brand: brandReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
//   middleware: getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: ["persist/PERSIST"],
//     },
//   }),
});
export const persistor = persistStore(store);
