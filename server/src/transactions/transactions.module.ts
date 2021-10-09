import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from 'src/prisma.service';
import { TransactionQueryBuilder } from './transaction.queryBuilder';

@Module({
	providers: [TransactionsService, PrismaService, TransactionQueryBuilder],
	controllers: [TransactionsController],
})
export class TransactionsModule {}
