import React, { FC } from 'react';
import { HStack, Link } from '@chakra-ui/react';
import { Link as RRDLink } from 'react-router-dom';

export interface UnauthorizedNavProps {}

const UnauthorizedNav: FC<UnauthorizedNavProps> = () => (
  <HStack className="mx-auto justify-center items-center">
    <Link as={RRDLink} to="/login">
      Login
    </Link>
    <Link as={RRDLink} to="/register">
      Register
    </Link>
  </HStack>
);

export default UnauthorizedNav;
