import React, { FC } from 'react';
import { Redirect } from 'react-router';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { useAuth } from '../../hooks/useAuth';

export interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
	const { isAuthenticated } = useAuth();

	function generateRandomNumber() {
		return Math.ceil(Math.random() * 5000);
	}

	const data = [
		{ name: 'a', uv: generateRandomNumber(), pv: generateRandomNumber() },
		{ name: 'b', uv: generateRandomNumber(), pv: generateRandomNumber() },
		{ name: 'c', uv: generateRandomNumber(), pv: generateRandomNumber() },
		{ name: 'd', uv: generateRandomNumber(), pv: generateRandomNumber() },
		{ name: 'e', uv: generateRandomNumber(), pv: generateRandomNumber() },
	];

	if (!isAuthenticated) {
		return <Redirect to='/' />;
	}

	return (
		<LineChart height={500} width={1000} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
			<CartesianGrid strokeDasharray='3 3' />
			<XAxis dataKey='name' />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line type='monotone' dataKey='pv' stroke='#8884d8' />
			<Line type='monotone' dataKey='uv' stroke='#82ca9d' />
		</LineChart>
	);
};

export default Dashboard;
