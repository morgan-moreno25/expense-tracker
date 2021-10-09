import React, { FC } from 'react';

export interface DropdownTextProps {}

const DropdownText: FC<DropdownTextProps> = ({ children }) => {
	return (
		<span className='text-lg py-1 px-4 flex justify-center items-center text-black'>
			{children}
		</span>
	);
};

export default DropdownText;
