import React, { FC } from 'react';
import { ITransactionsFilter } from '../../hooks/useTransactionsFilter';
import { Pagination as BSPagination } from 'react-bootstrap';
import { usePaginationHelpers } from '../../hooks/usePaginationHelpers';

export interface PaginationProps {
	filter: ITransactionsFilter;
	totalPages: number;
}

const Pagination: FC<PaginationProps> = ({ filter: { query, setQuery }, totalPages }) => {
	const {
		getDisplayedPages,
		setLimit,
		goToFirstPage,
		goToPreviousPage,
		goToSpecificPage,
		goToNextPage,
		goToLastPage,
		limitOptions,
	} = usePaginationHelpers({ query, setQuery }, totalPages);

	return (
		<div className='flex justify-between items-center w-full'>
			<select
				value={query.limit}
				onChange={e => setLimit(Number(e.target.value))}
				className='w-32 border-1 border-gray-900 outline-none rounded-lg p-1 text-center bg-blue-200'>
				{limitOptions.map(option => (
					<option value={option.value} key={option.value}>
						{option.text}
					</option>
				))}
			</select>
			<BSPagination>
				<BSPagination.First onClick={goToFirstPage} />
				<BSPagination.Prev onClick={goToPreviousPage} />

				{getDisplayedPages(query.page, totalPages).map(page => {
					let isActive = query.page === page ? 'bg-blue-600 text-white' : '';

					return (
						<BSPagination.Item key={page} onClick={() => goToSpecificPage(page)} className={isActive}>
							{page}
						</BSPagination.Item>
					);
				})}

				<BSPagination.Next onClick={goToNextPage} />
				<BSPagination.Last onClick={goToLastPage} />
			</BSPagination>
		</div>
	);
};

export default Pagination;
