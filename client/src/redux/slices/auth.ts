import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadUserRequest, loginRequest, registerRequest } from '../services/auth';
import { RootState } from '../store';
import { BaseState, ILoginRequestDto, IRegisterRequestDto, IUser } from '../types';
import { isPendingAction, isRejectedAction } from '../utils/actionMatchers';
import { pendingHandler, rejectedHandler } from '../utils/thunkHandlers';

export const login = createAsyncThunk<{ token: string }, ILoginRequestDto, {}>(
	'auth/login',
	async (params, { rejectWithValue }) => {
		try {
			const { success, data } = await loginRequest(params);

			if (success) {
				return {
					token: data.token as string,
				};
			} else {
				return rejectWithValue(data);
			}
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const register = createAsyncThunk<{ token: string }, IRegisterRequestDto, {}>(
	'auth/register',
	async (params, { rejectWithValue }) => {
		try {
			const { success, data } = await registerRequest(params);

			if (success) {
				return {
					token: data.token as string,
				};
			} else {
				return rejectWithValue(data);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const loadUser = createAsyncThunk<{ user: IUser }, void, {}>(
	'auth/loadUser',
	async (_params, { rejectWithValue }) => {
		try {
			const { success, data } = await loadUserRequest();

			if (success) {
				return {
					user: data.user as IUser,
				};
			} else {
				return rejectWithValue(data);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export interface AuthState extends BaseState {
	isAuthenticated: boolean;
	user: IUser | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	isLoading: false,
	error: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			localStorage.removeItem('accessToken');

			state.isAuthenticated = false;
			state.user = null;
		},
	},
	extraReducers: ({ addCase, addMatcher }) => {
		addCase(login.fulfilled, (state, { payload }) => {
			localStorage.setItem('accessToken', JSON.stringify(payload.token));

			state.isLoading = false;
			state.isAuthenticated = true;
		});
		addCase(register.fulfilled, (state, { payload }) => {
			localStorage.setItem('accessToken', JSON.stringify(payload.token));

			state.isLoading = false;
			state.isAuthenticated = true;
		});
		addCase(loadUser.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.isAuthenticated = true;
			state.user = payload.user;
		});

		addMatcher(isPendingAction, pendingHandler);
		addMatcher(isRejectedAction, rejectedHandler);
	},
});

export const { logout } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
