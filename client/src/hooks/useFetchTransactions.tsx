import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
	getTransactions,
	selectTransactionError,
	selectTransactionLoading,
	selectTransactions,
} from '../redux/slices/transactions';
import { ITransaction, ITransactionQueryDto } from '../redux/types';

export interface FetchTransactionsState {
	data: {
		transactions: ITransaction[];
		count: number;
	};
	isLoading: boolean;
	error: any;
	fetchTransactions: (query: ITransactionQueryDto) => void;
}

export const useFetchTransactions = (): FetchTransactionsState => {
	const dispatch = useAppDispatch();

	const data = useAppSelector(selectTransactions);
	const isLoading = useAppSelector(selectTransactionLoading);
	const error = useAppSelector(selectTransactionError);

	const fetchTransactions = useCallback(
		async (query: ITransactionQueryDto) => {
			await dispatch(getTransactions(query));
		},
		[dispatch]
	);

	return {
		data,
		isLoading,
		error,
		fetchTransactions,
	};
};
