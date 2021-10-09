import { AxiosRequestConfig } from 'axios';
import api from '.';
export const BASE_URL_DEV: string = 'http://localhost:3001';
export const BASE_URL_PROD: string = '';

export const tokenConfig = (): AxiosRequestConfig => {
	let config: AxiosRequestConfig = {
		headers: {
			...api.defaults.headers,
		},
	};

	const token = localStorage.getItem('accessToken');

	if (token) {
		config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
	}

	return config;
};
