import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import articlesSlice from "../features/articles/articles";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    article: articlesSlice,
  },
});

export default store;
