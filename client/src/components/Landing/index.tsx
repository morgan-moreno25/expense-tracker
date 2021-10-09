import React, { FC } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export interface LandingPageProps {}

const LandingPage: FC<LandingPageProps> = () => {
	const { isAuthenticated } = useAuth();

	// TODO: Not sure if I want to keep this redirect
	// Are there any instances where I might want to view the landing page as an authenticated user?
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<div>
			<h1>LandingPage component works</h1>
		</div>
	);
};

export default LandingPage;
