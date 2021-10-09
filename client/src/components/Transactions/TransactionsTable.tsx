import React, { FC } from 'react';
import { Container, Table } from 'react-bootstrap';
import { ITransaction } from '../../redux/types';
import { Format } from '../../utils';

export interface TransactionsTableProps {
	transactions: ITransaction[];
}

const TransactionsTable: FC<TransactionsTableProps> = ({ transactions }) => {
	const TableHeadCell: FC = ({ children }) => <th className='text-center'>{children}</th>;
	const TableCell: FC<{ className?: string }> = ({ children, className }) => (
		<td className={`text-center ${className ? className : ''}`}>{children}</td>
	);

	return (
		<Container fluid>
			{transactions.length > 0 ? (
				<Table responsive>
					<thead>
						<tr>
							<TableHeadCell>Date</TableHeadCell>
							<TableHeadCell>Amount</TableHeadCell>
							<TableHeadCell>Description</TableHeadCell>
							<TableHeadCell>Type</TableHeadCell>
						</tr>
					</thead>
					<tbody>
						{transactions.map(transaction => (
							<tr key={transaction.id}>
								<TableCell>{Format.date(transaction.date)}</TableCell>
								<TableCell>{Format.currency(transaction.amount)}</TableCell>
								<TableCell>{Format.trim(transaction.description, 50)}</TableCell>
								<TableCell className={`${transaction.type === 'EXPENSE' ? 'text-danger' : 'text-success'}`}>
									{Format.capitalize(transaction.type)}
								</TableCell>
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<h1>No Data Found</h1>
			)}
		</Container>
	);
};

export default TransactionsTable;
