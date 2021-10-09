import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { TransactionsQueryDto } from './transaction.dto';

type TransactionWhere = Prisma.TransactionWhereInput;
type TransactionOrderBy =
	Prisma.Enumerable<Prisma.TransactionOrderByWithRelationInput>;
type PrismaPagination = {
	skip: number;
	take: number;
};
type TransactionQuery = {
	pagination: PrismaPagination;
	where: TransactionWhere;
	orderBy: TransactionOrderBy;
};

@Injectable()
export class TransactionQueryBuilder {
	private prismaWhere: TransactionWhere;
	private prismaOrderBy: TransactionOrderBy;

	constructor() {
		this.prismaWhere = {};
		this.prismaOrderBy = {
			date: 'desc',
		};
	}

	private buildPagination(query: TransactionsQueryDto): PrismaPagination {
		// Set up default pagination parameters
		let pageInt: number = 1;
		let limitInt: number = 10;

		// Check for a page query
		if (query.page && query.page !== undefined) {
			pageInt = Number(query.page);
		}

		// Check for a limit query
		if (query.limit) {
			limitInt = Number(query.limit);
		}

		// Return the pagination object
		return {
			skip: (pageInt - 1) * limitInt,
			take: limitInt,
		};
	}

	private buildDateQuery(query: TransactionsQueryDto): void {
		let start: Date;
		let end: Date;

		if (query.startDate) {
			start = new Date(query.startDate);
		} else {
			start = new Date('01-01-1900');
		}

		if (query.endDate) {
			end = new Date(query.endDate);
		} else {
			end = moment().endOf('day').toDate();
		}

		this.prismaWhere = {
			...this.prismaWhere,
			AND: [
				{
					date: { gte: start },
				},
				{
					date: { lte: end },
				},
			],
		};
	}

	private buildTypeQuery(query: TransactionsQueryDto): void {
		if (query.type) {
			this.prismaWhere = {
				...this.prismaWhere,
				type: query.type,
			};
		}
	}

	private buildSortQuery(query: TransactionsQueryDto): void {
		if (query.sortBy) {
			this.prismaOrderBy = {
				...this.prismaOrderBy,
				[query.sortBy]: query.sortDirection
					? query.sortDirection
					: 'asc',
			};
		}
	}

	public build(query: TransactionsQueryDto): TransactionQuery {
		const { skip, take } = this.buildPagination(query);
		this.buildDateQuery(query);
		this.buildTypeQuery(query);
		this.buildSortQuery(query);

		return {
			pagination: {
				skip,
				take,
			},
			where: this.prismaWhere,
			orderBy: this.prismaOrderBy,
		};
	}
}
