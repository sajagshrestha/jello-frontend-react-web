import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {UserDTO} from '../../api/dto/user';
import * as authService from '../../api/services/auth-service';
import {ERROR_MESSAGES} from '../../constants/error-message';
import {deleteUserFromLocalStorage, getUsername} from '../../utils/local-storage';

interface AuthSliceState {
    username: string;
    email?: string;
    isFetching: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage?: string;
}

const initialAuthSliceState: AuthSliceState = {
    username: getUsername() || '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userCredentials: UserDTO, thunkAPI) => {
        try {
            const response = await authService.login(userCredentials);
            return response;
        } catch (err: any) {
            console.log(err);
            return thunkAPI.rejectWithValue(err?.message || ERROR_MESSAGES.UNKNOWN);
        }
    }
);

export const signupUser = createAsyncThunk(
    'auth/signup',
    async (userCredentials: UserDTO, thunkAPI) => {
        try {
            const response = await authService.signup(userCredentials);
            return response;
        } catch (err: any) {
            console.log(err);
            return thunkAPI.rejectWithValue(err?.message || ERROR_MESSAGES.UNKNOWN);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthSliceState,
    reducers: {
        logout() {
            deleteUserFromLocalStorage();
            return {
                ...initialAuthSliceState,
                username: ''
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isFetching = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.username = action?.payload?.username;
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
            state.username = action?.payload?.username;
        });
        builder.addCase(signupUser.rejected, (state, action: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = action.payload;
        });
    }
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
