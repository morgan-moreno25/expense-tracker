import { Transaction, TransactionType } from '.prisma/client';

interface BaseResponse {
	success: boolean;
}
export interface TransactionsQueryResponse {
	transactions: Transaction[];
	count: number;
}

export interface TransactionsQueryResponseDto extends BaseResponse {
	data: TransactionsQueryResponse;
}
export interface SingleTransactionResponseDto {
	transaction: Transaction;
}
export interface CreateTransactionRequestBodyDto {
	date: string;
	amount: number;
	description: string;
	memo?: string;
	type: TransactionType;
}
export interface UpdateTransactionDto {
	transactionId: string;
	transaction: CreateTransactionRequestBodyDto;
}
export interface DeleteTransactionResponseDto {
	message: string;
}

export interface TransactionsQueryDto {
	page?: number;
	limit?: number;
	type?: TransactionType;
	startDate?: string;
	endDate?: string;
	sortBy?: string;
	sortDirection?: SortDirection;
}

export enum SortDirection {
	'asc' = 'asc',
	'desc' = 'desc',
}
