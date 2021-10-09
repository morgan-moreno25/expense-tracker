import React, { FC, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router';
import Dashboard from './components/Dashboard';
import LandingPage from './components/Landing';
import Login from './components/Login';
import Navbar from './components/Navbar/Navbar';
import Register from './components/Register';
import TransactionsSection from './components/Transactions';
import { useAuth } from './hooks/useAuth';

const App: FC = () => {
	const { user, fetchUser } = useAuth();

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	return (
		<div className='h-screen w-screen flex flex-col'>
			<Navbar user={user} />
			<Container as='main' className='flex flex-col justify-center items-center'>
				<Switch>
					<Route path='/' exact>
						<LandingPage />
					</Route>
					<Route path='/dashboard'>
						<Dashboard />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/register'>
						<Register />
					</Route>
					<Route path='/transactions'>
						<TransactionsSection />
					</Route>
				</Switch>
			</Container>
		</div>
	);
};

export default App;
