import { ITransactionsFilter } from './useTransactionsFilter';

export const usePaginationHelpers: UsePaginationHelpers = (filter, totalPages) => {
	const { query, setQuery } = filter;

	return {
		limitOptions: [
			{ text: '10', value: 10 },
			{ text: '25', value: 25 },
			{ text: '50', value: 50 },
			{ text: '100', value: 100 },
		],
		getDisplayedPages: (page, totalPages) => {
			let pagesToDisplay: number[] = [];
			let numberOfPagesToDisplay: number = totalPages - page > 5 ? 5 : totalPages - page;

			for (let i = 0; i <= numberOfPagesToDisplay; i++) {
				pagesToDisplay.push(page + i);
			}

			return pagesToDisplay;
		},
		setLimit: newLimit => {
			setQuery({
				...query,
				limit: newLimit,
			});
		},
		goToFirstPage: () => {
			setQuery({
				...query,
				page: 1,
			});
		},
		goToPreviousPage: () => {
			setQuery({
				...query,
				page: query.page === 1 ? 1 : query.page - 1,
			});
		},
		goToSpecificPage: newPage => {
			setQuery({
				...query,
				page: newPage,
			});
		},
		goToNextPage: () => {
			setQuery({
				...query,
				page: totalPages === query.page ? totalPages : query.page + 1,
			});
		},
		goToLastPage: () => {
			setQuery({
				...query,
				page: totalPages,
			});
		},
	};
};

type PaginationHelpers = {
	getDisplayedPages: GetDisplayedPages;
	setLimit: SetLimit;
	goToFirstPage: VoidFunction;
	goToPreviousPage: VoidFunction;
	goToSpecificPage: GoToSpecificPage;
	goToNextPage: VoidFunction;
	goToLastPage: VoidFunction;
	limitOptions: LimitOption[];
};

type LimitOption = {
	text: string;
	value: number;
};
type GetDisplayedPages = (page: number, totalPages: number) => number[];
type SetLimit = (newLimit: number) => void;
type GoToSpecificPage = (newPage: number) => void;

type UsePaginationHelpers = (filter: ITransactionsFilter, totalPages: number) => PaginationHelpers;
