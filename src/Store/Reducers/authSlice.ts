import { createSlice } from "@reduxjs/toolkit";
interface st{
  isAuth: boolean;
  user: string;
  token: string;
  refreshToken: string;
}
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: "",
    token: "",
    refreshToken: "",
  },

  reducers: {
    loginSuccess(state:st, action) {
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      console.log("Login success reducer is called ");
    },
    logout(state:st){
        state.isAuth=false;
        state.user="";
        state.token="";
        state.refreshToken="";
    }
  },
});
export const {loginSuccess,logout}=authSlice.actions;
export default authSlice.reducer;
