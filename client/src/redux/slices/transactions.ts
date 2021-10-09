import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	createTransactionRequest,
	deleteTransactionRequest,
	fetchTransactionById,
	fetchTransactions,
	updateTransactionRequest,
} from '../services/transactions';
import { RootState } from '../store';
import {
	BaseState,
	ITransaction,
	ITransactionCreateDto,
	ITransactionQueryDto,
	ITransactionUpdateDto,
} from '../types';
import { isPendingAction, isRejectedAction } from '../utils/actionMatchers';
import { pendingHandler, rejectedHandler } from '../utils/thunkHandlers';

export const getTransactions = createAsyncThunk<
	{ transactions: ITransaction[]; count: number },
	ITransactionQueryDto,
	{}
>('transaction/query', async (query, { rejectWithValue }) => {
	try {
		const { success, data } = await fetchTransactions(query);

		if (success) {
			return {
				transactions: data.transactions as ITransaction[],
				count: data.count as number,
			};
		} else {
			return rejectWithValue(data);
		}
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const getTransactionById = createAsyncThunk<{ transaction: ITransaction }, number, {}>(
	'transaction/getById',
	async (transactionId, { rejectWithValue }) => {
		try {
			const { success, data } = await fetchTransactionById(transactionId);

			if (success) {
				return {
					transaction: data.transaction as ITransaction,
				};
			} else {
				return rejectWithValue(data);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const createTransaction = createAsyncThunk<
	{ transaction: ITransaction },
	ITransactionCreateDto,
	{}
>('transaction/create', async (transaction, { rejectWithValue }) => {
	try {
		const { success, data } = await createTransactionRequest(transaction);

		if (success) {
			return {
				transaction: data.transaction as ITransaction,
			};
		} else {
			return rejectWithValue(data);
		}
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const updateTransaction = createAsyncThunk<
	{ transaction: ITransaction; transactionId: number },
	ITransactionUpdateDto,
	{}
>('transaction/update', async (params, { rejectWithValue }) => {
	try {
		const { success, data } = await updateTransactionRequest(params);

		if (success) {
			return {
				transaction: data.transaction as ITransaction,
				transactionId: params.transactionId,
			};
		} else {
			return rejectWithValue(data);
		}
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const deleteTransaction = createAsyncThunk<{ transactionId: number }, number, {}>(
	'transaction/delete',
	async (transactionId, { rejectWithValue }) => {
		try {
			const { success, data } = await deleteTransactionRequest(transactionId);

			if (success) {
				return {
					transactionId,
				};
			} else {
				return rejectWithValue(data);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export interface TransactionState extends BaseState {
	transactions: ITransaction[];
	count: number;
	currentTransaction: ITransaction | null;
}

const initialState: TransactionState = {
	transactions: [],
	count: 0,
	currentTransaction: null,
	isLoading: false,
	error: '',
};

const transactionSlice = createSlice({
	name: 'transaction',
	initialState,
	reducers: {},
	extraReducers: ({ addCase, addMatcher }) => {
		addCase(getTransactions.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.transactions = payload.transactions;
			state.count = payload.count;
		});
		addCase(getTransactionById.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.currentTransaction = payload.transaction;
		});
		addCase(createTransaction.fulfilled, (state, { payload }) => {
			let transactionsCopy: ITransaction[] = state.transactions;
			let transactionsCount: number = state.count + 1;

			transactionsCopy.unshift(payload.transaction);
			transactionsCopy.pop();

			state.isLoading = false;
			state.transactions = transactionsCopy;
			state.count = transactionsCount;
		});
		addCase(updateTransaction.fulfilled, (state, { payload }) => {
			let transactionsCopy: ITransaction[] = state.transactions;
			let index: number = transactionsCopy.findIndex(
				transaction => transaction.id === payload.transaction.id
			);

			if (index !== -1) {
				transactionsCopy.splice(index, 1, payload.transaction);
			}

			state.isLoading = false;
			state.transactions = transactionsCopy;
			state.currentTransaction = payload.transaction;
		});
		addCase(deleteTransaction.fulfilled, (state, { payload }) => {
			let transactionsCopy: ITransaction[] = state.transactions.filter(
				transaction => transaction.id !== payload.transactionId
			);

			state.isLoading = false;
			state.currentTransaction = null;
			state.transactions = transactionsCopy;
		});

		addMatcher(isPendingAction, pendingHandler);
		addMatcher(isRejectedAction, rejectedHandler);
	},
});

export const selectTransactions = (state: RootState) => ({
	transactions: state.transaction.transactions,
	count: state.transaction.count,
});
export const selectCurrentTransaction = (state: RootState) => state.transaction.currentTransaction;
export const selectTransactionLoading = (state: RootState) => state.transaction.isLoading;
export const selectTransactionError = (state: RootState) => state.transaction.error;

export default transactionSlice.reducer;
