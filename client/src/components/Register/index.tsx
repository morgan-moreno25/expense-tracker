import React, { FC } from 'react';
import { Button, Col, Form, FormControl, FormGroup, FormLabel, FormText, Row } from 'react-bootstrap';
import { SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { useZodForm, useAuth } from '../../hooks';

export interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
	const { register } = useAuth();

	const { register: registerInput, handleSubmit, errors } = useZodForm(ZOD_REGISTER_FORM);

	const onSubmit: SubmitHandler<RegisterFormInputs> = async data => {
		register(data);
	};
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Row>
				<Col xs={6}>
					<FormGroup controlId='firstName'>
						<FormLabel>First Name</FormLabel>
						<FormControl {...registerInput('firstName', { required: true })} />
						{errors.firstName?.message && <FormText className='text-danger'>{errors.firstName.message}</FormText>}
					</FormGroup>
				</Col>
				<Col xs={6}>
					<FormGroup controlId='lastName'>
						<FormLabel>Last Name</FormLabel>
						<FormControl {...registerInput('lastName', { required: true })} />
						{errors.lastName?.message && <FormText>{errors.lastName.message}</FormText>}
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col xs={12}>
					<FormGroup controlId='email'>
						<FormLabel>Email</FormLabel>
						<FormControl {...registerInput('email', { required: true })} />
						{errors.email?.message && <FormText>{errors.email.message}</FormText>}
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col xs={12}>
					<FormGroup controlId='password'>
						<FormLabel>Password</FormLabel>
						<FormControl {...registerInput('password', { required: true })} />
						{errors.password?.message && <FormText>{errors.password.message}</FormText>}
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col xs={12}>
					<Button variant='primary' block type='submit'>
						Submit
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

type RegisterFormInputs = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

const ZOD_REGISTER_FORM: z.ZodRawShape = {
	firstName: z.string().min(1, { message: 'First Name is required' }),
	lastName: z.string().min(1, { message: 'Last name is required' }),
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(1, { message: 'Password is required' }),
};

export default Register;
