import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:8000";

const initialState = {
  article: [],
  loading: false,
  success: false,
  error: false,
  message: "",
};

export const getArticles = createAsyncThunk(
  "articles/getArticles",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${backendURL}/api/articles`, config);
      return response.data;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postArticle = createAsyncThunk(
  "article/postArticle",
  async (article, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${backendURL}/api/articles`,
        article,
        config
      );
      return response.data;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const favoriteArticle = createAsyncThunk(
  "article/favoriteArticle",
  async ({ _id, userId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `${backendURL}/api/articles/${_id}`,
        { _id, userId },
        config
      );
      return response.data;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProfileArticle = createAsyncThunk(
  "article/getProfileArticle",
  async (slug, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${backendURL}/api/articles/${slug}`,
        config
      );
      return response.data;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const articlesSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    resetArticles: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.article = action.payload;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.article = [];
      })
      .addCase(postArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(postArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.article.push(action.payload);
      })
      .addCase(postArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.article = [];
      })

      .addCase(favoriteArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updateArticle = action.payload;
        console.log(updateArticle);
        const articleIndex = state.article.findIndex(
          (item) => item._id === updateArticle.article._id
        );

        if (articleIndex === -1) {
          return;
        }

        const article = state.article[articleIndex];

        if (article.favoritesCount.includes(updateArticle.userId)) {
          article.favoritesCount = article.favoritesCount.filter(
            (id) => id !== updateArticle.userId
          );
          article.favorited = article.favoritesCount.length;
        } else {
          article.favoritesCount.push(updateArticle.userId);
          article.favorited = article.favoritesCount.length;
        }

        return state;
      })

      .addCase(favoriteArticle.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getProfileArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.article = action.payload;
      });
  },
});

export const { resetArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
