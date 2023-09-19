import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import streamService from "./services/stream.service";
export const getAllMovies = createAsyncThunk(
  "media/getAllMovies",
  async (_, thunkAPI) => {
    try {
      return await streamService.getallMovies();
      // Assuming the response object has a data property
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const streamSlice = createSlice({
  name: "stream",
  initialState: {},
  reducers: {},
});

// Export the actions
export const {} = streamSlice.actions;

export default streamSlice.reducer;
