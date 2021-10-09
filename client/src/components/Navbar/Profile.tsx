import React, { FC, useState } from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../redux/slices/auth';
import { useAppDispatch } from '../../redux/hooks';
import DropdownItem from './DropdownItem';
import DropdownLink from './DropdownLink';
import { IUser } from '../../redux/types';
import DropdownText from './DropdownText';

export interface ProfileProps {
	user: IUser;
}

const Profile: FC<ProfileProps> = ({ user }) => {
	const dispatch = useAppDispatch();

	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	const closeDropdownWhenAnyPartOfDropdownIsClicked = () => {
		if (dropdownOpen) {
			setDropdownOpen(false);
		}
	};

	return (
		<div
			className={`dropdown ${dropdownOpen ? 'show' : ''}`}
			onClick={closeDropdownWhenAnyPartOfDropdownIsClicked}>
			<button
				onClick={toggleDropdown}
				aria-haspopup={true}
				aria-expanded={dropdownOpen}
				className='hover:bg-gray-600 rounded-xl hover:shadow-xl p-1 cursor-pointer ml-auto mr-auto flex justify-center items-center btn btn-transparent whitespace-nowrap'>
				<Image src={user.avatar} roundedCircle height={50} width={50} />
			</button>
			<div className={`dropdown-menu ${dropdownOpen ? 'show' : ''} m-0`}>
				<DropdownText>{`${user.firstName} ${user.lastName}`}</DropdownText>
				<DropdownText>{user.email}</DropdownText>
				<Dropdown.Divider />
				<DropdownLink to='/profile'>Profile</DropdownLink>
				<DropdownItem
					onClick={e => {
						e.preventDefault();
						dispatch(logout());
					}}>
					Logout
				</DropdownItem>
			</div>
		</div>
	);
};

export default Profile;
