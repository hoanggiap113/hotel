import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user.type";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ accessToken: string; user: User }>) {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.accessToken);
      }
    },
    logOut(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
    },
    loadTokenFromStorage(state) {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
          state.isAuthenticated = true;
          state.accessToken = token;
        }
      }
    },
  },
});

export const { loginSuccess, logOut, loadTokenFromStorage } = authSlice.actions;
export default authSlice.reducer;
