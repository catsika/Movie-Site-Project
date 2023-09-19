import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newMovie } from "../stream/models/movie.interface";
import adminService from "./services/admin.service";
import { RootState } from "../../store";

const initialState = {
  isUploading: false,
  isSuccess: false,
  isError: false,
};

export const upload = createAsyncThunk(
  "media/upload",
  async (movie: newMovie, thunkAPI) => {
    try {
      const tokenObject = localStorage.getItem("jwt"); // Get the object from local storage
      const token = tokenObject ? JSON.parse(tokenObject).token : null; // Extract the token property
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // You may adjust the content type as needed
      };
      return await adminService.upload(movie, headers);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(`Unable to upload ${error}`);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(upload.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(upload.fulfilled, (state) => {
        state.isUploading = false;
        state.isSuccess = true;
      })
      .addCase(upload.rejected, (state) => {
        state.isUploading = false;
        state.isError = true;
      });
  },
});
export const selectedAdmin = (state: RootState) => {
  return state.admin;
};
export default adminSlice.reducer;
