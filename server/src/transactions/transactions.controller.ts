import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import {
	CreateTransactionRequestBodyDto,
	DeleteTransactionResponseDto,
	SingleTransactionResponseDto,
	TransactionsQueryDto,
	TransactionsQueryResponseDto,
} from './transaction.dto';
import { TransactionsService } from './transactions.service';

// TODO: UPDATE `GET /` TO HANDLE QUERY
// TODO: UPDATE `GET /` TO RETURN COUNT OF TRANSACTIONS IN QUERY

@Controller('transactions')
export class TransactionsController {
	constructor(private readonly transactionService: TransactionsService) {}

	@Get('/')
	@HttpCode(200)
	@UseGuards(AuthGuard)
	async getTransactionsByQuery(
		@Query() query: TransactionsQueryDto,
		@Req() req: Request,
	): Promise<TransactionsQueryResponseDto> {
		const { transactions, count } =
			await this.transactionService.getByQuery(query, req.userId);

		return {
			success: true,
			data: {
				transactions,
				count,
			},
		};
	}

	@Get('/:transactionId')
	@HttpCode(200)
	@UseGuards(AuthGuard)
	async getTransactionById(
		@Req() req: Request,
		@Param('transactionId') transactionId: string,
	): Promise<SingleTransactionResponseDto> {
		const transaction = await this.transactionService.getById(
			transactionId,
			req.userId,
		);

		console.log(transaction);

		return {
			transaction,
		};
	}

	@Post('/')
	@HttpCode(201)
	@UseGuards(AuthGuard)
	async createTransaction(
		@Req() req: Request,
		@Body() body: CreateTransactionRequestBodyDto,
	): Promise<SingleTransactionResponseDto> {
		const transaction = await this.transactionService.create(
			body,
			req.userId,
		);

		return {
			transaction,
		};
	}

	@Patch('/:transactionId')
	@HttpCode(200)
	@UseGuards(AuthGuard)
	async updateTransaction(
		@Param('transactionId') transactionId: string,
		@Body() body: CreateTransactionRequestBodyDto,
	): Promise<SingleTransactionResponseDto> {
		const transaction = await this.transactionService.update({
			transaction: body,
			transactionId,
		});

		return {
			transaction,
		};
	}

	@Delete('/:transactionId')
	@HttpCode(200)
	@UseGuards(AuthGuard)
	async deleteTransaction(
		@Param('transactionId') transactionId: string,
	): Promise<DeleteTransactionResponseDto> {
		await this.transactionService.delete(transactionId);

		return {
			message: 'Successfully deleted transaction',
		};
	}
}
