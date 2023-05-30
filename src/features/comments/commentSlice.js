import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:8000";

const initialState = {
  comments: [],
  loading: false,
  success: false,
  error: false,
  message: "",
};

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (slug, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${backendURL}/api/articles/comments/${slug}`,
        config
      );
      return response.data;
    } catch (err) {
      const message =
        (err.message && err.response.data && err.response.data.message) ||
        err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postComment = createAsyncThunk(
  "comments/postComment",
  async ({ slug, comments }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${backendURL}/api/articles/${slug}`,
        { comments },
        config
      );
      return response.data;
    } catch (err) {
      const message =
        (err.message && err.response.data && err.response.data.message) ||
        err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetComments: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(postComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        console.log("postComment.fulfilled triggered");
        console.log("Payload:", action.payload.comments);
        state.loading = false;
        state.success = true;
        state.comments.push(action.payload.comments);
      })

      .addCase(postComment.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { resetComments } = commentsSlice.actions;
export default commentsSlice.reducer;
