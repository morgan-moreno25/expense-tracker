import React, { FC } from 'react';

export interface DropdownItemProps {
	onClick?: React.MouseEventHandler<HTMLSpanElement>;
}

const DropdownItem: FC<DropdownItemProps> = ({ children, onClick }) => {
	return (
		<span
			className='text-lg py-1 px-4 flex justify-center items-center text-black hover:bg-gray-200 cursor-pointer'
			onClick={onClick}>
			{children}
		</span>
	);
};

export default DropdownItem;
