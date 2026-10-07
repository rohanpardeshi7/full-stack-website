import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: Cookies.get("token") || "",
  },
  reducers: {
    setToken: (state, reqData) => {
      const { token } = reqData.payload;
      state.token = token;
      Cookies.set("token", state.token,);
    },
    logout: (state) => {
      state.token = "";
      Cookies.remove("token", { path: "/" });
    },
  },
});

export const { setToken, logout } = userSlice.actions;
export default userSlice.reducer;