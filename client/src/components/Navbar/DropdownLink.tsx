import React, { FC } from 'react';
import { Link } from '@chakra-ui/react';
import { Link as RRDLink } from 'react-router-dom';
import DropdownItem from './DropdownItem';

export interface DropdownLinkProps {
  to: string;
  children: React.ReactNode;
}

const DropdownLink: FC<DropdownLinkProps> = ({ to, children }) => (
  <Link as={RRDLink} to={to} textDecor="none">
    <DropdownItem>{children}</DropdownItem>
  </Link>
);

export default DropdownLink;
