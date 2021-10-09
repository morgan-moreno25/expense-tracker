import React, { FC, useState } from 'react';
import { Button, Col, Form, FormControl, FormGroup, FormLabel, FormText, Row } from 'react-bootstrap';
import { ITransactionsFilter } from '../../hooks/useTransactionsFilter';
import { useZodForm } from '../../hooks/useZodForm';
import * as z from 'zod';
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import moment from 'moment';
import FilterToggler from './FilterToggler';
import RadioGroup from './RadioGroup';
import { TransactionType } from '../../redux/types';

export interface TransactionsFilterProps {
	filter: ITransactionsFilter;
}

const TransactionsFilter: FC<TransactionsFilterProps> = ({ filter }) => {
	const [filterOpen, setFilterOpen] = useState<boolean>(false);

	const toggleFilterOpen = () => setFilterOpen(!filterOpen);

	const { register, errors, handleSubmit, setValue, setError } = useZodForm(ZOD_TRANSACTIONS_FILTERS);

	const onSubmit: SubmitHandler<TransactionsFilterInputs> = data => {
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

	const onInvalid: SubmitErrorHandler<TransactionsFilterInputs> = errors => {
		console.log('Filter Form Errors: ', errors);
	};

	return (
		<Row className='my-4 justify-start items-center w-full'>
			<Col xs={12} className='justify-start items-start'>
				<FilterToggler toggle={toggleFilterOpen} />
				{filterOpen ? (
					<Row className='w-full border-1 border-gray-700 my-2 justify-center items-center'>
						<Col xs={12}>
							<Form onSubmit={handleSubmit(onSubmit, onInvalid)}>
								<Row className='justify-start items-center w-full'>
									<Col xs={12}>
										<FormGroup controlId='startDate'>
											<FormLabel>Start Date</FormLabel>
											<FormControl type='date' {...register('startDate')} />
											{errors.startDate?.message && (
												<FormText className='text-danger'>{errors.startDate.message}</FormText>
											)}
										</FormGroup>
									</Col>
								</Row>
								<Row className='justify-start items-center w-full'>
									<Col xs={12}>
										<FormGroup controlId='endDate'>
											<FormLabel>End Date</FormLabel>
											<FormControl type='date' {...register('endDate')} />
											{errors.endDate?.message && <FormText className='text-danger'>{errors.endDate.message}</FormText>}
										</FormGroup>
									</Col>
								</Row>
								<Row className='justify-start items-center w-full'>
									<Col xs={6}>
										<RadioGroup controlId='type' label='Income'>
											<input type='radio' name='type' onChange={() => setValue('type', TransactionType.INCOME)} />
										</RadioGroup>
									</Col>
									<Col xs={6}>
										<RadioGroup controlId='type' label='Expense'>
											<input type='radio' name='type' onChange={() => setValue('type', TransactionType.EXPENSE)} />
										</RadioGroup>
									</Col>
								</Row>
								<Row className='justify-center items-center w-full'>
									<Button variant='info' type='submit'>
										Apply
									</Button>
									<Button variant='danger' onClick={toggleFilterOpen}>
										Cancel
									</Button>
								</Row>
							</Form>
						</Col>
					</Row>
				) : null}
			</Col>
		</Row>
	);
};

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

const createQueryFieldsToUpdate = (query: QueryFieldsToUpdate): QueryFieldsToUpdate => {
	let queryFieldsToUpdate: QueryFieldsToUpdate = {};

	if (query.startDate) queryFieldsToUpdate.startDate = query.startDate;
	if (query.endDate) queryFieldsToUpdate.endDate = query.endDate;
	if (query.type) queryFieldsToUpdate.type = query.type;

	return queryFieldsToUpdate;
};

export default TransactionsFilter;
