import React, { FC } from 'react';
import { Nav as BSNav, Navbar } from 'react-bootstrap';
import NavLink from './NavLink';

export interface NavProps {}

const Nav: FC<NavProps> = () => {
	return (
		<>
			<Navbar.Toggle aria-controls='mobile-nav' />
			<Navbar.Collapse id='mobile-nav'>
				<>
					<BSNav className='ml-auto gap-3'>
						<NavLink to='/dashboard'>Dashboard</NavLink>
						<NavLink to='/transactions'>Transactions</NavLink>
					</BSNav>
				</>
			</Navbar.Collapse>
		</>
	);
};

export default Nav;
