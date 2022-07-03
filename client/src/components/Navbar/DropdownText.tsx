import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';

export interface DropdownTextProps {
  children: React.ReactNode;
}

const DropdownText: FC<DropdownTextProps> = ({ children }) => (
  <Box
    py={1}
    px={4}
    fontSize="lg"
    display="flex"
    justifyContent="center"
    alignItems="center"
    color="black"
  >
    {children}
  </Box>
);

export default DropdownText;
