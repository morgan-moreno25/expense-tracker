import { useState } from 'react';
import { ITransactionQueryDto } from '../redux/types';

export interface ITransactionsFilter {
	query: ITransactionQueryDto;
	setQuery: (queryFieldsToUpdate: ITransactionQueryDto) => void;
}

export type UseTransactionsFilterHook = (initialValue: ITransactionQueryDto) => ITransactionsFilter;

export const useTransactionsFilter: UseTransactionsFilterHook = initialValue => {
	const [filter, setFilter] = useState<ITransactionQueryDto>(initialValue);

	return {
		query: filter,
		setQuery: queryFieldsToUpdate => {
			let newQuery = {
				...filter,
				...queryFieldsToUpdate,
			};

			setFilter(newQuery);
		},
	};
};
