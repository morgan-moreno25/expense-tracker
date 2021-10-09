import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import NavLink from './NavLink';

export interface UnauthorizedNavProps {}

const UnauthorizedNav: FC<UnauthorizedNavProps> = () => {
	return (
		<Row className='mx-auto justify-center items-center'>
			<Col xs={6} className='justify-center items-center'>
				<NavLink to='/login'>Login</NavLink>
			</Col>
			<Col xs={6} className='justify-center items-center'>
				<NavLink to='/register'>Register</NavLink>
			</Col>
		</Row>
	);
};

export default UnauthorizedNav;
