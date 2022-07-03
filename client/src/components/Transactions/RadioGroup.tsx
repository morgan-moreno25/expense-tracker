import React, { FC } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';

export interface RadioGroupProps {
  controlId: string;
  label: string;
  children: React.ReactNode;
}

const RadioGroup: FC<RadioGroupProps> = ({ controlId, label, children }) => (
  <FormControl p={2} display={'flex'} gap={2} alignItems={'center'}>
    {children}
    <FormLabel m={0}>{label}</FormLabel>
  </FormControl>
);

export default RadioGroup;
