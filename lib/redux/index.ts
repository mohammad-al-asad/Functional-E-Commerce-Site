import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import authSlice from "./AuthSlice";

export const store = configureStore({
  reducer:{
    cart:CartSlice,
    auth:authSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
