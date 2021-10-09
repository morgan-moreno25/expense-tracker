import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loadUser, selectIsAuthenticated, selectUser, login, register } from '../redux/slices/auth';
import { ILoginRequestDto, IRegisterRequestDto, IUser } from '../redux/types';

type AuthHelpers = {
	isAuthenticated: boolean;
	user: IUser | null;
	fetchUser: () => void;
	login: (credentials: ILoginRequestDto) => void;
	register: (credentials: IRegisterRequestDto) => void;
};

type UseAuth = () => AuthHelpers;

export const useAuth: UseAuth = () => {
	const dispatch = useAppDispatch();

	const { push } = useHistory();

	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const user = useAppSelector(selectUser);

	const fetchUser = useCallback(async () => {
		const token = localStorage.getItem('accessToken');

		// In order for a request to make sense, we need to meet 2 criteria
		// 1) An accessToken is present. Any loadUser request made without a token will fail anyways.
		// 2) If user information is not already present. If we already have the user information, it does not make sense to fetch again.
		if (token && !user) {
			await dispatch(loadUser());
		} else {
			return;
		}

		// The following dependecy array throws a lint warning becuase it assumes that `isAuthenticated` is an unnecessary dependency because
		// it is not used within this callback function.
		// I am disabling this because we do want this to run anytime `isAuthenticated` changes as well.
		// Example:
		// When a user logs in or registers, isAuthenticated changes from false to true but user information has not been fetched yet.
		// In order to fetch user information when this state change occurs, we need to include `isAuthenticated` as a dependency.
		//eslint-disable-next-line
	}, [dispatch, user, isAuthenticated]);

	const _login = async (credentials: ILoginRequestDto) => {
		const result = await dispatch(login(credentials));

		if (login.fulfilled.match(result)) {
			push('/dashboard');
		}
	};

	const _register = async (credentials: IRegisterRequestDto) => {
		const result = await dispatch(register(credentials));

		if (register.fulfilled.match(result)) {
			push('/dashboard');
		}
	};

	return {
		isAuthenticated,
		user,
		fetchUser,
		login: _login,
		register: _register,
	};
};
