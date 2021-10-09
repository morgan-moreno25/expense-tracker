import React, { FC } from 'react';
import { FormGroup, FormLabel } from 'react-bootstrap';

export interface RadioGroupProps {
	controlId: string;
	label: string;
}

const RadioGroup: FC<RadioGroupProps> = ({ controlId, label, children }) => {
	return (
		<FormGroup controlId={controlId} className='p-2 flex gap-2 items-center'>
			{children}
			<FormLabel className='m-0'>{label}</FormLabel>
		</FormGroup>
	);
};

export default RadioGroup;
