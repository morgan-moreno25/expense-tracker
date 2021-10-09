import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import DropdownItem from './DropdownItem';

export interface DropdownLinkProps {
	to: string;
}

const DropdownLink: FC<DropdownLinkProps> = ({ children, to }) => {
	return (
		<Link to={to} className='no-underline'>
			<DropdownItem>{children}</DropdownItem>
		</Link>
	);
};

export default DropdownLink;
