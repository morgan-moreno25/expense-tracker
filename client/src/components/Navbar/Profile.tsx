import React, { FC } from 'react';
import {
  Menu,
  MenuButton,
  Image,
  MenuList,
  MenuItem,
  MenuDivider,
  Link,
  Avatar,
} from '@chakra-ui/react';
import { Link as RRDLink } from 'react-router-dom';
import { logout } from '../../redux/slices/auth';
import { useAppDispatch } from '../../redux/hooks';
import { IUser } from '../../redux/types';

export interface ProfileProps {
  user: IUser;
}

const Profile: FC<ProfileProps> = ({ user }) => {
  const dispatch = useAppDispatch();

  return (
    <Menu>
      <MenuButton>
        <Avatar src={user.avatar} rounded="full" h={50} w={50} />
      </MenuButton>
      <MenuList>
        <MenuItem
          disabled={true}
        >{`${user.firstName} ${user.lastName}`}</MenuItem>
        <MenuItem disabled={true}>{user.email}</MenuItem>
        <MenuDivider />
        <MenuItem>
          <Link as={RRDLink} to="/profile">
            Profile
          </Link>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;
