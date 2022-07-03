import React, { FC } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
} from '@chakra-ui/react';
import { SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router';
import * as z from 'zod';
import { useZodForm } from '../../hooks/useZodForm';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/slices/auth';

type LoginFormInputs = {
  email: string;
  password: string;
};

const ZOD_LOGIN_FORM: z.ZodRawShape = {
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required ' }),
};

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const { register, handleSubmit, errors } = useZodForm(ZOD_LOGIN_FORM, {
    email: '',
    password: '',
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const result = await dispatch(login(data));

    if (login.fulfilled.match(result)) {
      push('/dashboard');
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.email ? true : false}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          {...register('email', {
            required: true,
          })}
        />
        {errors.email?.message && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errors.password ? true : false}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          {...register('password', {
            required: true,
          })}
        />

        {errors.password?.message && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormControl>

      <Button bg="cyan.700" color="white" type="submit">
        Submit
      </Button>
    </VStack>
  );
};

export default Login;
