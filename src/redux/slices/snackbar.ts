import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface snackbarState {
  isOpen: boolean;
  severity: "success" | "error" | "warning" | "info" | undefined;
  message: string;
}

const initialState: snackbarState = {
  isOpen: false,
  severity: undefined,
  message: ""
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (
      state = initialState,
      action: PayloadAction<snackbarState>
    ) => {
      return {
        ...state,
        isOpen: true,
        severity: action.payload.severity,
        message: action.payload.message
      };
    },
    closeSnackbar: (state = initialState) => {
      return state.isOpen ? { ...state, isOpen: false } : state;
    }
  }
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
