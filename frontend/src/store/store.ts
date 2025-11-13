import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import searchReducer from "./slices/searchSlice";
export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      search: searchReducer
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
