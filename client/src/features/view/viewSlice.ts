import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import viewService from "./services/view.service";

export const getSelectMovie = createAsyncThunk(
  "media/getMovie",
  async (_id: string, thunkAPI) => {
    try {
      return await viewService.getSelectMovie(_id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const viewSlice = createSlice({
  name: "view",
  initialState: {},
  reducers: {},
});

export const {} = viewSlice.actions;

export default viewSlice.reducer;
