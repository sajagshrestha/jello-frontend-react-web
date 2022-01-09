import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {UserDTO} from '../../api/dto/user';
import * as authService from '../../api/services/auth-service';

interface AuthSliceState {
    username: string;
    email: string;
    isFetching: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage?: string;
}

const initialAuthSliceState: AuthSliceState = {
    username: '',
    email: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
};

// const signupUser = createAsyncThunk('auth/signup', async (userCredentials: UserDTO, thunkAPI) => {
//     try {
//         const user = await authService.signup(userCredentials);

//         return response?.data;
//     } catch (error) {
//         console.log(error);
//         thunkAPI.rejectWithValue(error);
//     }
// });

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthSliceState,
    reducers: {
        // Reducer comes here
    },
    extraReducers: {}
});

export default authSlice.reducer;
