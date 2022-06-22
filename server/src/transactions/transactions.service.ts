import { Prisma, Transaction, TransactionType } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
	CreateTransactionRequestBodyDto,
	TransactionsQueryDto,
	TransactionsQueryResponse,
	UpdateTransactionDto,
} from './transaction.dto';
import { TransactionQueryBuilder } from './transaction.queryBuilder';

@Injectable()
export class TransactionsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly queryBuilder: TransactionQueryBuilder,
	) {}

	async getByQuery(
		query: TransactionsQueryDto,
		userId: string,
	): Promise<TransactionsQueryResponse> {
		const {
			pagination: { skip, take },
			where,
			orderBy,
		} = this.queryBuilder.build(query);

		const transactions = await this.prisma.transaction.findMany({
			skip,
			take,
			where: {
				...where,
				userId,
			},
			orderBy,
		});

		const count = await this.prisma.transaction.count({
			where: {
				...where,
				userId,
			},
		});

		return {
			transactions,
			count,
		};
	}

	async getById(transactionId: string, userId: string): Promise<Transaction> {
		const transaction = await this.prisma.transaction.findUnique({
			where: {
				id: transactionId,
			},
		});

		if (transaction.userId === userId) {
			return transaction;
		} else {
			throw new HttpException(
				'You can not access this resource',
				HttpStatus.UNAUTHORIZED,
			);
		}
	}

	async create(
		transaction: CreateTransactionRequestBodyDto,
		userId: string,
	): Promise<Transaction> {
		return await this.prisma.transaction.create({
			data: {
				...transaction,
				userId,
			},
		});
	}

	async update({
		transactionId,
		transaction,
	}: UpdateTransactionDto): Promise<Transaction> {
		return await this.prisma.transaction.update({
			where: {
				id: transactionId,
			},
			data: {
				...transaction,
			},
		});
	}
	async delete(transactionId: string): Promise<void> {
		await this.prisma.transaction.delete({
			where: {
				id: transactionId,
			},
		});
	}
}
