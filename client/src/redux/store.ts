import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import transactionsReducer from './slices/transactions';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		transaction: transactionsReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
