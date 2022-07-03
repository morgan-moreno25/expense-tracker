import React, { FC } from 'react';
import { Button, IconButton, Select } from '@chakra-ui/react';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';
import { ITransactionsFilter } from '../../hooks/useTransactionsFilter';
import { usePaginationHelpers } from '../../hooks/usePaginationHelpers';

export interface PaginationProps {
  filter: ITransactionsFilter;
  totalPages: number;
}

const Pagination: FC<PaginationProps> = ({
  filter: { query, setQuery },
  totalPages,
}) => {
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
    <div className="flex justify-between items-center w-full">
      <Select
        value={query.limit}
        onChange={(e) => setLimit(Number(e.target.value))}
      >
        {limitOptions.map(({ value, text }) => (
          <option value={value} key={value}>
            {text}
          </option>
        ))}
      </Select>
      <div className="flex justify-evenly items-center w-full">
        <IconButton
          aria-label="first page"
          bg="white"
          color="cyan.400"
          icon={<FaAngleDoubleLeft />}
          onClick={goToFirstPage}
        />
        <IconButton
          bg="white"
          color="cyan.400"
          aria-label="previous page"
          icon={<FaAngleLeft />}
          onClick={goToPreviousPage}
        />

        {getDisplayedPages(query.page, totalPages).map((page) => {
          let isActive = query.page === page ? 'bg-blue-600 text-white' : '';

          return (
            <Button
              bg="white"
              color="cyan.400"
              rounded="full"
              onClick={() => goToSpecificPage(page)}
              className={isActive}
            >
              {page}
            </Button>
          );
        })}

        <IconButton
          bg="white"
          color="cyan.400"
          aria-label="next page"
          icon={<FaAngleRight />}
          onClick={goToNextPage}
        />
        <IconButton
          bg="white"
          color="cyan.400"
          aria-label="last page"
          icon={<FaAngleDoubleRight />}
          onClick={goToLastPage}
        />
      </div>
    </div>
  );
};

export default Pagination;
