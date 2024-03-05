import { createSlice } from "@reduxjs/toolkit";
interface st{
  isAuth: boolean;
  user: string;
  token: string;
}
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: "",
    token: "",
  },

  reducers: {
    loginSuccess(state:st, action) {
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      console.log("Login success reducer is called ");
    },
    logout(state:st){
        state.isAuth=false;
        state.user="";
        state.token="";
    }
  },
});
export const {loginSuccess,logout}=authSlice.actions;
export default authSlice.reducer;
