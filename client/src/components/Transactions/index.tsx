import React, { FC, useEffect } from 'react';
import { useFetchTransactions } from '../../hooks/useFetchTransactions';
import { useTransactionsFilter } from '../../hooks/useTransactionsFilter';
import TransactionsFilter from './TransactionsFilters';
import TransactionsTable from './TransactionsTable';
import Pagination from './Pagination';

export interface TransactionsSectionProps {}

const TransactionsSection: FC<TransactionsSectionProps> = () => {
	const { data, isLoading, error, fetchTransactions } = useFetchTransactions();

	const filter = useTransactionsFilter({
		page: 1,
		limit: 10,
		startDate: undefined,
		endDate: undefined,
		type: undefined,
	});

	useEffect(() => {
		fetchTransactions(filter.query);
	}, [fetchTransactions, filter.query]);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	if (error) {
		return <h1>{error.message}</h1>;
	}

	return (
		<>
			<TransactionsFilter filter={filter} />
			<TransactionsTable transactions={data.transactions} />
			<Pagination filter={filter} totalPages={Math.ceil(data.count / filter.query.limit)} />
		</>
	);
};

export default TransactionsSection;
