import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useAuth, useZodForm } from '../../hooks';

export interface RegisterFormProps {}

interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// TODO: Extract to lib/zod.ts
const ZOD_REGISTER_FORM: z.ZodRawShape = {
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
};

const DEFAULT_VALUES: RegisterFormInputs = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const RegisterForm: FC<RegisterFormProps> = () => {
  const { register } = useAuth();

  const {
    register: registerInput,
    handleSubmit,
    errors,
  } = useZodForm(ZOD_REGISTER_FORM, DEFAULT_VALUES);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    register(data);
  };

  const isInvalid = (field: keyof RegisterFormInputs) => {
    return errors[field] ? true : false;
  };

  return (
    <VStack onSubmit={handleSubmit(onSubmit)}>
      <HStack>
        <VStack>
          <FormControl isInvalid={isInvalid('firstName')}>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              {...registerInput('firstName', { required: true })}
            />
            {errors.firstName?.message && (
              <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>
            )}
          </FormControl>
        </VStack>
        <VStack>
          <FormControl isInvalid={isInvalid('lastName')}>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              {...registerInput('lastName', { required: true })}
            />
            {errors.lastName?.message && (
              <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>
            )}
          </FormControl>
        </VStack>
      </HStack>
      <HStack>
        <VStack>
          <FormControl isInvalid={isInvalid('email')}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...registerInput('email', { required: true })}
            />
            {errors.email?.message && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
        </VStack>
      </HStack>
      <HStack>
        <VStack>
          <FormControl isInvalid={isInvalid('password')}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...registerInput('password', { required: true })}
            />
            {errors.password?.message && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
        </VStack>
      </HStack>
      <HStack>
        <VStack>
          <Button bg="cyan.700" color="white" type="submit">
            Submit
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
};
