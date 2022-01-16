import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { useDispatch } from "react-redux";
import authReducer from "./slices/auth-slice";
import snackbarReducer from "./slices/snackbar";

const reducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer
});

const app = "";

export const store = configureStore({
  reducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
