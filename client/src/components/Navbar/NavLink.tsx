import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface NavLinkProps {
	to: string;
}

const NavLink: FC<NavLinkProps> = ({ to, children }) => {
	const { pathname } = useLocation();

	const active = pathname === to ? 'text-blue-200 font-bold' : 'text-gray-200';

	return (
		<Link
			to={to}
			className={`${active} cursor-pointer hover:bg-gray-600 p-2 rounded-xl no-underline`}>
			{children}
		</Link>
	);
};

export default NavLink;
