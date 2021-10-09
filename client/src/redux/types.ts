import { PayloadAction } from '@reduxjs/toolkit';

type Service<P, R> = (params: P) => Promise<R>;
interface BaseResponse {
	success: boolean;
	data: {
		message?: string;
		[key: string]: any;
	};
}
export interface BaseState {
	isLoading: boolean;
	error: any;
}

export type ThunkHandler = (state: BaseState, action: PayloadAction<any>) => void;

export type AuthService<P> = Service<P, AuthResponse>;
export interface AuthResponse extends BaseResponse {
	data: {
		token?: string;
		user?: IUser;
	};
}
export interface IUser {
	id: number;
	avatar: string;
	firstName: string;
	lastName: string;
	email: string;
}
export interface ILoginRequestDto {
	email: string;
	password: string;
}
export interface IRegisterRequestDto {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export type TransactionService<P> = Service<P, TransactionResponse>;
export interface TransactionResponse extends BaseResponse {
	data: {
		transactions?: ITransaction[];
		count?: number;
		transaction?: ITransaction;
	};
}
export enum TransactionType {
	'INCOME' = 'INCOME',
	'EXPENSE' = 'EXPENSE',
}
export interface ITransaction {
	id: number;
	date: string;
	amount: number;
	description: string;
	memo: string;
	type: TransactionType;
	userId: number;
}
export interface ITransactionCreateDto {
	date: string;
	amount: number;
	description: string;
	memo: string;
	type: TransactionType;
}
export interface ITransactionUpdateDto {
	transactionId: number;
	transaction: ITransactionCreateDto;
}
export interface ITransactionQueryDto {
	page: number;
	limit: number;
	type?: TransactionType;
	startDate?: string;
	endDate?: string;
}
