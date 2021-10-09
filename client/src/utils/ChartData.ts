import moment, { Moment } from 'moment';
import { ITransaction } from '../redux/types';

type Data = {
	name: string;
	income: number;
	expenses: number;
};

type Months = {
	[key: number]: string;
};

export class ChartData {
	private transactions: ITransaction[];
	private months: Months;

	constructor(transactions: ITransaction[]) {
		this.transactions = transactions;
		this.months = {
			1: 'JAN',
			2: 'FEB',
			3: 'MAR',
			4: 'APR',
			5: 'MAY',
			6: 'JUN',
			7: 'JUL',
			8: 'AUG',
			9: 'SEP',
			10: 'OCT',
			11: 'NOV',
			12: 'DEC',
		};
	}

	private getIncome(): ITransaction[] {
		return this.transactions.filter(transaction => transaction.type === 'INCOME');
	}

	private getExpenses(): ITransaction[] {
		return this.transactions.filter(transaction => transaction.type === 'EXPENSE');
	}

	private sortTransactionsByDate(transactions: ITransaction[]): ITransaction[] {
		function sortByDate(a: ITransaction, b: ITransaction): 0 | 1 | -1 {
			let aMoment = moment(a.date);
			let bMoment = moment(b.date);

			if (aMoment.isBefore(bMoment)) {
				return -1;
			}

			if (aMoment.isAfter(bMoment)) {
				return 1;
			}

			return 0;
		}

		transactions.sort(sortByDate);

		return transactions;
	}

	private getTotalForTransactions(transactions: ITransaction[]): number {
		let total: number = 0;

		for (let i = 0; i < transactions.length; i++) {
			total += transactions[i].amount;
		}

		return total;
	}

	private filterByMonth(transaction: ITransaction, monthStart: Moment, monthEnd: Moment): boolean {
		let transactionDate: moment.Moment = moment(transaction.date);

		if (transactionDate.isSameOrAfter(monthStart) && transactionDate.isSameOrBefore(monthEnd)) {
			return true;
		} else {
			return false;
		}
	}

	public getDataByMonth(): Data[] {
		let income = this.getIncome();
		let expenses = this.getExpenses();

		income = this.sortTransactionsByDate(income);
		expenses = this.sortTransactionsByDate(expenses);

		let data: Data[] = [];

		for (let i = 0; i < Object.keys(this.months).length; i++) {
			let monthStart: moment.Moment = moment(`${i}-01-2021`);
			let monthEnd: moment.Moment = monthStart.endOf('month');

			let incomeTransactionsInMonthRange = income.filter(transaction =>
				this.filterByMonth(transaction, monthStart, monthEnd)
			);

			let totalIncomeInMonth = this.getTotalForTransactions(incomeTransactionsInMonthRange);

			let expenseTransactionsInMonthRange = expenses.filter(transaction =>
				this.filterByMonth(transaction, monthStart, monthEnd)
			);

			let totalExpensesInMonth = this.getTotalForTransactions(expenseTransactionsInMonthRange);

			let _data: Data = {
				name: this.months[i],
				income: totalIncomeInMonth,
				expenses: totalExpensesInMonth,
			};

			data.push(_data);
		}

		return data;
	}
}
