import React, { FC } from 'react';
import { Link } from '@chakra-ui/react';
import { Link as RRDLink, useLocation } from 'react-router-dom';

export interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: FC<NavLinkProps> = ({ to, children }) => {
  const { pathname } = useLocation();

  const active = pathname === to;
  const TO = to;
  const HOVER = {
    background: 'gray.600',
  };
  const PADDING = 2;
  const CURSOR = active ? 'default' : 'pointer';
  const ROUNDED = 'xl';
  const TEXT_DECORATION = 'none';
  const COLOR = active ? 'blue.200' : 'gray.200';
  const FONT_WEIGHT = active ? 'bold' : 'normal';

  return (
    <Link
      as={RRDLink}
      to={TO}
      _hover={HOVER}
      p={PADDING}
      cursor={CURSOR}
      rounded={ROUNDED}
      textDecoration={TEXT_DECORATION}
      color={COLOR}
      fontWeight={FONT_WEIGHT}
    >
      {children}
    </Link>
  );
};

export default NavLink;
