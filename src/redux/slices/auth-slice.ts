import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDTO } from "../../api/dto/user";
import * as authService from "../../api/services/auth-service";
import { ERROR_MESSAGES } from "../../constants/error-message";
import {
  deleteUserFromLocalStorage,
  getUserFromLocalStorage
} from "../../utils/local-storage";
import { openSnackbar } from "./snackbar";

interface AuthSliceState {
  id: string;
  username: string;
  email?: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}
const user = getUserFromLocalStorage();
const initialAuthSliceState: AuthSliceState = {
  username: user?.username || "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  id: user?.id || ""
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userCredentials: UserDTO, thunkAPI) => {
    try {
      const response = await authService.login(userCredentials);

      return response;
    } catch (err: any) {
      const errorMessage = err?.message || ERROR_MESSAGES.UNKNOWN;

      thunkAPI.dispatch(
        openSnackbar({
          isOpen: true,
          severity: "error",
          message: errorMessage
        })
      );

      return thunkAPI.rejectWithValue(err?.message || ERROR_MESSAGES.UNKNOWN);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userCredentials: UserDTO, thunkAPI) => {
    try {
      const response = await authService.signup(userCredentials);

      return response;
    } catch (err: any) {
      const errorMessage = err?.message || ERROR_MESSAGES.UNKNOWN;

      thunkAPI.dispatch(
        openSnackbar({
          isOpen: true,
          severity: "error",
          message: errorMessage
        })
      );

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthSliceState,
  reducers: {
    logout() {
      deleteUserFromLocalStorage();

      return {
        ...initialAuthSliceState,
        id: "",
        username: ""
      };
    },
    clearError(state) {
      state.isError = false;
      state.errorMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
      state.username = action?.payload?.username;
      state.id = action?.payload?.id;
    });
    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });
    builder.addCase(signupUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
      state.username = action?.payload?.username;
      state.id = action?.payload?.id;
    });
    builder.addCase(signupUser.rejected, (state, action: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
