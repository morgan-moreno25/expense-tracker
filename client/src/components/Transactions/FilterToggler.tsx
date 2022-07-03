import React, { FC } from 'react';
import { Button, VStack, HStack } from '@chakra-ui/react';

export interface FilterTogglerProps {
  toggle: () => void;
}

const FilterToggler: FC<FilterTogglerProps> = ({ toggle }) => {
  return (
    <HStack>
      <VStack>
        <Button
          bg="white"
          border="cyan"
          borderWidth={1}
          color="cyan.400"
          onClick={toggle}
        >
          Filters <i className="fas fa-filter" />
        </Button>
      </VStack>
    </HStack>
  );
};

export default FilterToggler;
