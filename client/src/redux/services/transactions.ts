import api from './api';
import {
	ITransactionCreateDto,
	ITransactionQueryDto,
	ITransactionUpdateDto,
	TransactionResponse,
	TransactionService,
} from '../types';
import { serviceHandler } from '../utils/serviceHandler';
import { tokenConfig } from './api/config';

export const fetchTransactions: TransactionService<ITransactionQueryDto> = query => {
	return serviceHandler<TransactionResponse>(
		api.get('/transactions', {
			...tokenConfig(),
			params: query,
		})
	);
};
export const fetchTransactionById: TransactionService<number> = transactionId => {
	return serviceHandler<TransactionResponse>(
		api.get(`/transactions/${transactionId}`, tokenConfig())
	);
};
export const createTransactionRequest: TransactionService<ITransactionCreateDto> = transaction => {
	return serviceHandler<TransactionResponse>(api.post('/transactions', transaction, tokenConfig()));
};
export const updateTransactionRequest: TransactionService<ITransactionUpdateDto> = ({
	transactionId,
	transaction,
}) => {
	return serviceHandler<TransactionResponse>(
		api.patch(`/transactions/${transactionId}`, transaction, tokenConfig())
	);
};
export const deleteTransactionRequest: TransactionService<number> = transactionId => {
	return serviceHandler<TransactionResponse>(
		api.delete(`/transactions/${transactionId}`, tokenConfig())
	);
};
