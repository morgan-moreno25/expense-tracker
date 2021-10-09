import React, { FC } from 'react';
import { Container, Navbar as BSNavbar } from 'react-bootstrap';
import { IUser } from '../../redux/types';
import Nav from './Nav';
import Profile from './Profile';
import UnauthorizedNav from './UnauthorizedNav';

interface NavbarProps {
	user: IUser | null;
}

const Navbar: FC<NavbarProps> = ({ user }) => {
	return (
		<BSNavbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
			<Container>
				{user ? (
					<>
						<Profile user={user} />
						<Nav />
					</>
				) : (
					<UnauthorizedNav />
				)}
			</Container>
		</BSNavbar>
	);
};

export default Navbar;
