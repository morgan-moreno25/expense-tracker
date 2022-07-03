import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';

export interface DropdownItemProps {
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  children: React.ReactNode;
}

const DropdownItem: FC<DropdownItemProps> = ({ onClick, children }) => (
  <Box
    onClick={onClick}
    fontSize={'lg'}
    py={1}
    px={4}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    color={'black'}
    cursor={'pointer'}
    _hover={{ background: 'gray.200' }}
  >
    {children}
  </Box>
);

export default DropdownItem;
