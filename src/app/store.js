import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import articlesReducer from "../features/articles/articlesSlice";
import friendReducer from "../features/friends/friendSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    article: articlesReducer,
    friend: friendReducer,
  },
});

export default store;
