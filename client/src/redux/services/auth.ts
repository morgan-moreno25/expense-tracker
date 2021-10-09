import api from './api';
import { AuthResponse, AuthService, ILoginRequestDto, IRegisterRequestDto } from '../types';
import { tokenConfig } from './api/config';
import { serviceHandler } from '../utils/serviceHandler';

export const loginRequest: AuthService<ILoginRequestDto> = params => {
	return serviceHandler<AuthResponse>(api.post('/auth/login', params));
};

export const registerRequest: AuthService<IRegisterRequestDto> = params => {
	return serviceHandler<AuthResponse>(api.post('/auth/register', params));
};

export const loadUserRequest: AuthService<void> = () => {
	return serviceHandler<AuthResponse>(api.get('/auth/me', tokenConfig()));
};
