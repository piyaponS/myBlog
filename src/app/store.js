import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import articlesReducer from "../features/articles/articlesSlice";
import friendReducer from "../features/friends/friendSlice";
import commentReducer from "../features/comments/commentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    article: articlesReducer,
    friend: friendReducer,
    comment: commentReducer,
  },
});

export default store;
