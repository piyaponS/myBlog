import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:8000";

const initialState = {
  friend: null,
  loading: false,
  success: false,
  error: false,
  message: "",
};

export const getFriends = createAsyncThunk(
  "friends/getFriends",
  async (username, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${backendURL}/api/profile/${username}`,
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

export const friendsSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    reset: (state) => {
      state.friend = null;
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFriends.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.friend = action.payload;
      });
  },
});
export const { reset } = friendsSlice.actions;
export default friendsSlice.reducer;
