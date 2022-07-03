import React, { FC, useState } from 'react';
import {
  Button,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Center,
} from '@chakra-ui/react';
import * as z from 'zod';
import moment from 'moment';
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { ITransactionsFilter } from '../../hooks/useTransactionsFilter';
import { useZodForm } from '../../hooks/useZodForm';
import FilterToggler from './FilterToggler';
import { TransactionType } from '../../redux/types';

export interface TransactionsFilterProps {
  filter: ITransactionsFilter;
}

const TransactionsFilter: FC<TransactionsFilterProps> = ({ filter }) => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  const toggleFilterOpen = () => setFilterOpen(!filterOpen);

  const { register, errors, handleSubmit, setValue, setError } =
    useZodForm<TransactionsFilterInputs>(ZOD_TRANSACTIONS_FILTERS, {});

  const onSubmit: SubmitHandler<TransactionsFilterInputs> = (data) => {
    console.log('Filter Form Data: ', data);

    if (areDatesValid(data.startDate, data.endDate)) {
      let queryFieldsToUpdate = createQueryFieldsToUpdate(data);

      filter.setQuery({
        ...queryFieldsToUpdate,
        page: filter.query.page,
        limit: filter.query.limit,
      });

      toggleFilterOpen();
    } else {
      setError('startDate', {
        type: 'validate',
        message: 'Start date must be before the end date',
      });

      setError('endDate', {
        type: 'validate',
        message: 'End date must be after the start date',
      });
    }
  };

  const onInvalid: SubmitErrorHandler<TransactionsFilterInputs> = (errors) => {
    console.log('Filter Form Errors: ', errors);
  };

  return (
    <HStack my={4} justify={'start'} align={'center'} w={'full'}>
      <VStack justify={'start'} align={'start'}>
        <FilterToggler toggle={toggleFilterOpen} />
        {filterOpen && (
          <HStack
            w={'full'}
            border={'gray.700'}
            borderWidth={1}
            my={2}
            justify={'center'}
            align={'center'}
          >
            <VStack as="form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
              <HStack justify={'start'} align={'center'} w={'full'}>
                <FormControl>
                  <FormLabel>Start Date</FormLabel>
                  <Input type="date" {...register('startDate')} />
                  {errors.startDate?.message && (
                    <FormErrorMessage>
                      {errors.startDate.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </HStack>
              <HStack justify={'start'} align={'center'} w={'full'}>
                <FormControl>
                  <FormLabel>End Date</FormLabel>
                  <Input type="date" {...register('endDate')} />
                  {errors.endDate?.message && (
                    <FormErrorMessage>
                      {errors.endDate.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </HStack>
              <HStack>
                <Center>
                  <input
                    type="radio"
                    name="type"
                    onChange={() => setValue('type', TransactionType.INCOME)}
                  />
                  <FormLabel>Income</FormLabel>
                </Center>
                <Center>
                  <input
                    type="radio"
                    name="type"
                    onChange={() => setValue('type', TransactionType.EXPENSE)}
                  />
                  <FormLabel>Expense</FormLabel>
                </Center>
              </HStack>
              <HStack>
                <Center>
                  <Button bg="cyan.600" color="white" type="submit">
                    Apply
                  </Button>
                </Center>
                <Center>
                  <Button bg="red.600" color="white" onClick={toggleFilterOpen}>
                    Cancel
                  </Button>
                </Center>
              </HStack>
            </VStack>
          </HStack>
        )}
      </VStack>
    </HStack>
  );
};

// TODO: Can the below be abstracted away
const ZOD_TRANSACTIONS_FILTERS: z.ZodRawShape = {
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE]).optional(),
};

type TransactionsFilterInputs = {
  startDate?: string;
  endDate?: string;
  type?: TransactionType;
};

const areDatesValid = (startDate?: string, endDate?: string): boolean => {
  if (startDate && endDate) {
    return moment(startDate).isBefore(moment(endDate));
  }

  return true;
};

type QueryFieldsToUpdate = {
  startDate?: string;
  endDate?: string;
  type?: TransactionType;
};

const createQueryFieldsToUpdate = (
  query: QueryFieldsToUpdate,
): QueryFieldsToUpdate => {
  let queryFieldsToUpdate: QueryFieldsToUpdate = {};

  if (query.startDate) queryFieldsToUpdate.startDate = query.startDate;
  if (query.endDate) queryFieldsToUpdate.endDate = query.endDate;
  if (query.type) queryFieldsToUpdate.type = query.type;

  return queryFieldsToUpdate;
};

export default TransactionsFilter;
