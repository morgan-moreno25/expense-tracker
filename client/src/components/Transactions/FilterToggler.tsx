import React, { FC } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

export interface FilterTogglerProps {
	toggle: () => void;
}

const FilterToggler: FC<FilterTogglerProps> = ({ toggle }) => {
	return (
		<Row>
			<Col xs={12}>
				<Button variant='outline-primary' onClick={toggle}>
					Filters <i className='fas fa-filter' />
				</Button>
			</Col>
		</Row>
	);
};

export default FilterToggler;
