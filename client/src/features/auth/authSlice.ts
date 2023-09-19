import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./models/AsyncState.interface";
import { NewUser } from "./models/NewUser";
import authService from "./services/auth.service";
import { RootState } from "../../store";
import { OldUser } from "./models/OldUser";

const initialState: AuthState = {
  user: null, //user
  jwt: null, //jwt
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (user: NewUser, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the error has a response with a message from the server
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        // Other network or server errors
        return thunkAPI.rejectWithValue(
          "Unable to register. Please try again later."
        );
      }
    }
  }
);

export const signin = createAsyncThunk(
  "auth/login",
  async (user: OldUser, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return thunkAPI.rejectWithValue("Invalid email or password");
      } else {
        return thunkAPI.rejectWithValue("Invalid email or password");
      }
    }
  }
);

export const verifyJwt = createAsyncThunk(
  "auth/verify-jwt",
  async (jwt: string, thunkAPI) => {
    try {
      return await authService.verifyJwt(jwt);
    } catch (error) {
      return thunkAPI.rejectWithValue("Couldn't authenticate request");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //REGISTER
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      //LOGIN
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.jwt = action.payload.jwt;
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
      })
      .addCase(signin.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      //VERIFY JWT
      .addCase(verifyJwt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyJwt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = action.payload;
      })
      .addCase(verifyJwt.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuthenticated = false;
      });
  },
});
export const { reset } = authSlice.actions;
export const selectedUser = (state: RootState) => {
  return state.auth;
};
export default authSlice.reducer;
