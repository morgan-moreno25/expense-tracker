import React, { FC } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap';
import { SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router';
import * as z from 'zod';
import { useZodForm } from '../../hooks/useZodForm';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/slices/auth';

const Login: FC = () => {
	const dispatch = useAppDispatch();
	const { push } = useHistory();

	const { register, handleSubmit, errors } = useZodForm(ZOD_LOGIN_FORM);

	const onSubmit: SubmitHandler<LoginFormInputs> = async data => {
		const result = await dispatch(login(data));

		if (login.fulfilled.match(result)) {
			push('/dashboard');
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormGroup controlId='email'>
				<FormLabel>Email</FormLabel>
				<FormControl
					{...register('email', {
						required: true,
					})}
				/>
				{errors.email?.message && <FormText className='text-danger'>{errors.email.message}</FormText>}
			</FormGroup>
			<FormGroup controlId='password'>
				<FormLabel>Password</FormLabel>
				<FormControl
					type='password'
					{...register('password', {
						required: true,
					})}
				/>
				{errors.password?.message && <FormText className='text-danger'>{errors.password.message}</FormText>}
			</FormGroup>

			<Button variant='primary' block type='submit'>
				Submit
			</Button>
		</Form>
	);
};

type LoginFormInputs = {
	email: string;
	password: string;
};

const ZOD_LOGIN_FORM: z.ZodRawShape = {
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(1, { message: 'Password is required ' }),
};

export default Login;
