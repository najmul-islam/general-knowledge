import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { adminApi } from "../api/adminApi";
import { publicApi } from "../api/publicApi";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [publicApi.reducerPath]: publicApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(publicApi.middleware, adminApi.middleware),
});

setupListeners(store.dispatch);
